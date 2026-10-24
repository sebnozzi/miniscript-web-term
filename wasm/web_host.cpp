// web_host.cpp
//
// MiniScript 2 host for the browser, compiled to WebAssembly with Emscripten.
//
// JavaScript drives the interpreter in time slices: it loads a program, then
// calls ms_run() repeatedly (from setTimeout or requestAnimationFrame) until it
// reports DONE.  Nothing here ever blocks: `input` and `import` park the VM in
// a waiting state, ms_run() reports which one, and JS resumes it by supplying
// the line (ms_provideInput) or the module source (ms_provideFile).  That keeps
// the build free of Asyncify, and makes stopping a program trivial -- JS just
// stops calling ms_run (or calls ms_stop to also discard the program).
//
// Output goes to JS through Module.msPrint(text, lineBreak, isError), input
// requests through Module.msRequestInput(prompt), and module requests through
// Module.msRequestFile(libname).  See src/ms2Engine.ts.

#include <emscripten/emscripten.h>
#include <string>
#include <map>

#include "miniscript.h"
#include "ErrorTypes.g.h"
#include "GCManager.g.h"

using namespace MiniScript;

//--------------------------------------------------------------------------------
// JS bridge
//--------------------------------------------------------------------------------

EM_JS(void, js_print, (const char* text, int lineBreak, int isError), {
	Module.msPrint(UTF8ToString(text), !!lineBreak, !!isError);
});

EM_JS(void, js_requestInput, (const char* prompt), {
	Module.msRequestInput(UTF8ToString(prompt));
});

EM_JS(void, js_requestFile, (const char* libname), {
	Module.msRequestFile(UTF8ToString(libname));
});

//--------------------------------------------------------------------------------
// Host state
//--------------------------------------------------------------------------------

// Values returned by ms_run.
enum RunStatus {
	STATUS_DONE = 0,        // program finished (normally, by error, or stopped)
	STATUS_RUNNING = 1,     // time slice used up; call ms_run again right away
	STATUS_YIELDED = 2,     // script yielded (yield/wait); call again next frame
	STATUS_WAIT_INPUT = 3,  // `input` is waiting; call ms_provideInput, then ms_run
	STATUS_WAIT_FILE = 4    // `import` is waiting; call ms_provideFile, then ms_run
};

enum WaitState { WAIT_NONE, WAIT_INPUT, WAIT_FILE };

static Interpreter interp;
static WaitState waitState = WAIT_NONE;

// Data handed in from JS while the VM waits.  Kept as std::string: a host
// String is not reachable by the GC and could be swept before the VM reads it.
static bool replyReady = false;
static bool replyIsNull = false;
static std::string replyText;

// Module sources fetched so far, by library name.  A repeat import (most of
// the standard libs import each other) then needs no round trip through JS.
static std::map<std::string, std::string> importCache;

static void Print(String s, Boolean lineBreak) {
	js_print(s.c_str(), lineBreak ? 1 : 0, 0);
}

static void PrintErr(String s, Boolean lineBreak) {
	js_print(s.c_str(), lineBreak ? 1 : 0, 1);
}

// Begin waiting on JS.  The VM yields so RunUntilDone returns to ms_run.
static void BeginWait(Context& context, WaitState state) {
	waitState = state;
	replyReady = false;
	replyIsNull = false;
	replyText.clear();
	context.vm.yielding = true;
}

//--------------------------------------------------------------------------------
// input(prompt=null)
//--------------------------------------------------------------------------------

static IntrinsicResult intrinsic_input(Context context, IntrinsicResult partialResult) {
	if (partialResult.Done()) {
		// Fresh call: hand JS the prompt, and wait for it to supply a line.
		// (JS shows the prompt itself, since a line editor must redraw it.)
		Value prompt = context.GetArg(0);
		BeginWait(context, WAIT_INPUT);
		js_requestInput(prompt.IsNull() ? "" : prompt.ToString().c_str());
		return IntrinsicResult(Value::one, false);
	}
	if (!replyReady) {
		context.vm.yielding = true;
		return partialResult;
	}
	waitState = WAIT_NONE;
	replyReady = false;
	// At end of input we return null, as command-line MiniScript does.
	if (replyIsNull) return IntrinsicResult::Null;
	return IntrinsicResult(Value::make_string(replyText.c_str()));
}

//--------------------------------------------------------------------------------
// wait(seconds=1)
//
// Same as the core version, except that it yields while waiting, so the page
// sleeps between frames instead of spinning through every time slice.
//--------------------------------------------------------------------------------

static IntrinsicResult intrinsic_wait(Context context, IntrinsicResult partialResult) {
	double now = context.vm.ElapsedTime();
	if (partialResult.Done()) {
		double interval = context.GetArg(0).NumericVal();
		GCManager::MaybeCollect(true);
		context.vm.yielding = true;
		return IntrinsicResult(Value(now + interval), false);
	}
	if (now > partialResult.result.NumericVal()) return IntrinsicResult::Null;
	context.vm.yielding = true;
	return partialResult;
}

//--------------------------------------------------------------------------------
// import(libname)
//
// Three states, told apart by the pending result:
//   fresh call       -- validate the name; use the cache or ask JS for the file
//   number pending   -- waiting on JS; once the source arrives, compile it and
//                       push its main function to run inline
//   string pending   -- the module has run; store its locals under libname
//--------------------------------------------------------------------------------

// Wrap a compiler error from an imported module so it names where in the
// module it happened.  (Same as raylib-miniscript's import.)
static Value ImportCompileError(String libname, Value compileErr) {
	String where = ErrorTypes::ErrorLocation(compileErr);
	if (where.empty()) where = libname + ".ms";
	String msg = String("in ") + where + ": " + compileErr.Message().ToString();
	return ErrorTypes::CompilerError(msg, compileErr);
}

static IntrinsicResult StartImportedModule(Context& context, const String& libname, const std::string& source) {
	Value compileErr;
	FuncDef moduleMain = Interpreter::CompileToFunc(String(source.c_str()), libname + ".ms", &compileErr);
	if (IsNull(moduleMain)) {
		if (!compileErr.IsNull()) return IntrinsicResult(ImportCompileError(libname, compileErr));
		return IntrinsicResult::Null;
	}
	context.vm.ManuallyPushCall(context.baseIndex, moduleMain);
	return IntrinsicResult(libname, false);
}

static IntrinsicResult intrinsic_import(Context context, IntrinsicResult partialResult) {
	// Module finished running: bind and return its locals map.
	if (!partialResult.Done() && partialResult.result.Type() == ValueType::String) {
		Value importedValues = context.vm.ManualCallResult;
		String libname = partialResult.result.ToString();
		context.vm.SetVar(libname, importedValues);
		return IntrinsicResult(importedValues);
	}

	String libname = context.GetVar("libname").ToString();

	// Waiting on JS for the module source.
	if (!partialResult.Done()) {
		if (!replyReady) {
			context.vm.yielding = true;
			return partialResult;
		}
		waitState = WAIT_NONE;
		replyReady = false;
		if (replyIsNull) {
			return IntrinsicResult(ErrorTypes::FileError("import: library not found: " + libname));
		}
		std::string key(libname.c_str());
		importCache[key] = replyText;
		return StartImportedModule(context, libname, replyText);
	}

	// Fresh call.
	if (libname.empty()) {
		return IntrinsicResult(ErrorTypes::FileError("import: no library name given"));
	}
	if (libname.IndexOfB('/') >= 0 || libname.IndexOfB('\\') >= 0
	    || libname.IndexOfB(String("..")) >= 0) {
		return IntrinsicResult(ErrorTypes::FileError("import: argument must be library name, not path"));
	}
	auto cached = importCache.find(std::string(libname.c_str()));
	if (cached != importCache.end()) {
		return StartImportedModule(context, libname, cached->second);
	}
	BeginWait(context, WAIT_FILE);
	js_requestFile(libname.c_str());
	return IntrinsicResult(Value::one, false);
}

//--------------------------------------------------------------------------------
// exit
//--------------------------------------------------------------------------------

static IntrinsicResult intrinsic_exit(Context context, IntrinsicResult partialResult) {
	context.vm.Stop();
	return IntrinsicResult::Null;
}

//--------------------------------------------------------------------------------
// version
//
// The core `version` map knows only macOS, Windows and Linux as platforms, and
// says "Unknown" here.  Wrap it so the map says "Web".  (Same workaround as
// raylib-miniscript; remove once MS2 offers a hostPlatform setting.)
//--------------------------------------------------------------------------------

static Value versionMapValue;

static void WrapVersionIntrinsic() {
	Intrinsic versionFunc = Intrinsic::GetByName("version");
	if (IsNull(versionFunc)) return;
	NativeCallbackDelegate coreCode = versionFunc.Code();
	versionFunc.set_Code([coreCode](Context context, IntrinsicResult partialResult) {
		if (versionMapValue.IsNull()) {
			Value coreMap = coreCode(context, partialResult).result;
			versionMapValue = coreMap.MapConcat(Value::make_empty_map());
			versionMapValue.MapSet("platform", Value("Web"));
			versionMapValue.Freeze();
			GCManager::AddRoot(versionMapValue);
		}
		return IntrinsicResult(versionMapValue);
	});
}

//--------------------------------------------------------------------------------
// Exported API
//--------------------------------------------------------------------------------

extern "C" {

// Initialize the runtime and interpreter.  Call once, before anything else.
EMSCRIPTEN_KEEPALIVE
void ms_init(const char* hostName, const char* hostInfo, const char* hostVersion) {
	GCManager::Init();
	value_init_constants();
	ErrorTypes::Init();

	MiniScript::hostName = hostName;
	MiniScript::hostInfo = hostInfo;
	MiniScript::hostVersion = hostVersion;

	// The core intrinsics are created lazily; make them now, so we can swap in
	// our own code for the ones that must not block.
	Intrinsic::Count();
	Intrinsic::GetByName("input").set_Code(&intrinsic_input);
	Intrinsic::GetByName("wait").set_Code(&intrinsic_wait);
	WrapVersionIntrinsic();

	Intrinsic f = Intrinsic::Create("import");
	f.AddParam("libname", "");
	f.set_Code(&intrinsic_import);

	f = Intrinsic::Create("exit");
	f.set_Code(&intrinsic_exit);

	interp = Interpreter::New();
	interp.set_standardOutput(&Print);
	interp.set_implicitOutput(&Print);
	interp.set_errorOutput(&PrintErr);
}

// Load and compile a program.  Returns 1 on success, 0 on a compile error
// (already reported through the error output).
EMSCRIPTEN_KEEPALIVE
int ms_load(const char* source, const char* fileName) {
	waitState = WAIT_NONE;
	replyReady = false;
	interp.Reset(String(source));
	interp.set_SourceFile(String(fileName));
	interp.Compile();
	return IsNull(interp.vm()) ? 0 : 1;
}

// Run the loaded program for up to timeLimit seconds.  Returns a RunStatus.
EMSCRIPTEN_KEEPALIVE
int ms_run(double timeLimit) {
	if (interp.Done()) return STATUS_DONE;
	if (waitState == WAIT_INPUT && !replyReady) return STATUS_WAIT_INPUT;
	if (waitState == WAIT_FILE && !replyReady) return STATUS_WAIT_FILE;

	interp.RunUntilDone(timeLimit, true);

	if (interp.Done()) return STATUS_DONE;
	if (waitState == WAIT_INPUT) return STATUS_WAIT_INPUT;
	if (waitState == WAIT_FILE) return STATUS_WAIT_FILE;
	if (interp.vm().yielding()) return STATUS_YIELDED;
	return STATUS_RUNNING;
}

// Supply the line `input` is waiting for (null for end of input).
EMSCRIPTEN_KEEPALIVE
void ms_provideInput(const char* line) {
	if (waitState != WAIT_INPUT) return;
	replyIsNull = (line == nullptr);
	replyText = line ? line : "";
	replyReady = true;
}

// Supply the module source `import` is waiting for (null if not found).
EMSCRIPTEN_KEEPALIVE
void ms_provideFile(const char* source) {
	if (waitState != WAIT_FILE) return;
	replyIsNull = (source == nullptr);
	replyText = source ? source : "";
	replyReady = true;
}

// Stop the running program.
EMSCRIPTEN_KEEPALIVE
void ms_stop() {
	interp.Stop();
	waitState = WAIT_NONE;
	replyReady = false;
}

// Forget cached import sources (e.g. after the user edits a module).
EMSCRIPTEN_KEEPALIVE
void ms_clearImportCache() {
	importCache.clear();
}

} // extern "C"
