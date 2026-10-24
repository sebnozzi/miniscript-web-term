// Wrapper around the MiniScript 2 WebAssembly engine (dist/ms2-engine.js,
// built from wasm/web_host.cpp).  The engine never blocks; we drive it in time
// slices, and answer its requests for input lines and module sources.

declare global {
  interface Window { createMS2Engine?: (moduleArg: object) => Promise<any>; }
}

enum RunStatus { Done = 0, Running = 1, Yielded = 2, WaitInput = 3, WaitFile = 4 }

export interface EngineHost {
  print(text: string, lineBreak: boolean, isError: boolean): void;
  readLine(prompt: string): Promise<string | null>; // null means end of input
  loadModule(libname: string): Promise<string | null>; // null means not found
}

export interface HostInfo {
  hostName: string;
  hostInfo: string;
  hostVersion: string;
}

// How long each ms_run call may take, in seconds.  Short enough to keep the
// page responsive; long enough that the per-slice overhead doesn't matter.
const TIME_SLICE = 1 / 30;

export class MS2Engine {

  private pendingPrompt = "";
  private pendingModule: Promise<string | null> | null = null;
  private runId = 0;

  private constructor(private mod: any, private host: EngineHost) {}

  static async create(host: EngineHost, info: HostInfo): Promise<MS2Engine> {
    if (!window.createMS2Engine) {
      throw new Error("ms2-engine.js is not loaded");
    }
    let engine: MS2Engine;
    const mod = await window.createMS2Engine({
      msPrint: (text: string, lineBreak: boolean, isError: boolean) => host.print(text, lineBreak, isError),
      msRequestInput: (prompt: string) => { engine.pendingPrompt = prompt; },
      msRequestFile: (libname: string) => { engine.pendingModule = host.loadModule(libname); },
    });
    engine = new MS2Engine(mod, host);
    mod.ccall("ms_init", null, ["string", "string", "string"],
      [info.hostName, info.hostInfo, info.hostVersion]);
    return engine;
  }

  // Compile and run a program.  Resolves when it finishes, fails to compile,
  // or is stopped.
  async run(source: string, fileName: string): Promise<void> {
    const id = ++this.runId;
    const ok = this.mod.ccall("ms_load", "number", ["string", "string"], [source, fileName]);
    if (!ok) return;

    while (id === this.runId) {
      const status: RunStatus = this.mod.ccall("ms_run", "number", ["number"], [TIME_SLICE]);
      switch (status) {
        case RunStatus.Done:
          return;
        case RunStatus.Running:
          await nextTask();
          break;
        case RunStatus.Yielded:
          await nextFrame();
          break;
        case RunStatus.WaitInput: {
          const line = await this.host.readLine(this.pendingPrompt);
          if (id !== this.runId) return;
          this.mod.ccall("ms_provideInput", null, ["string"], [line]);
          break;
        }
        case RunStatus.WaitFile: {
          const src = this.pendingModule ? await this.pendingModule : null;
          this.pendingModule = null;
          if (id !== this.runId) return;
          this.mod.ccall("ms_provideFile", null, ["string"], [src]);
          break;
        }
      }
    }
  }

  // Stop the running program, if any.  Its run() promise resolves.
  stop() {
    this.runId++;
    this.pendingModule = null;
    this.mod.ccall("ms_stop", null, [], []);
  }

  // Forget cached module sources, so the next import fetches them again.
  clearImportCache() {
    this.mod.ccall("ms_clearImportCache", null, [], []);
  }
}

// Yield to the browser's event loop.  (A MessageChannel post is not subject
// to the 4ms clamp that nested setTimeout calls get.)
const channel = new MessageChannel();
const taskQueue: (() => void)[] = [];
channel.port1.onmessage = () => { const f = taskQueue.shift(); if (f) f(); };
function nextTask(): Promise<void> {
  return new Promise((resolve) => { taskQueue.push(resolve); channel.port2.postMessage(null); });
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}
