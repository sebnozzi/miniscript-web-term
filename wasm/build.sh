#!/bin/bash
#
# Build the MiniScript 2 WebAssembly engine (dist/ms2-engine.js + .wasm).
#
# Needs:
#   - the miniscript2 repo, at ../miniscript2 or wherever MS2_DIR points
#   - Emscripten (emcc on the PATH, or an emsdk at EMSDK_DIR to activate)
#
# Usage: wasm/build.sh [clean] [debug]

set -e
cd -P "$(dirname "$0")/.."

MS2_DIR="${MS2_DIR:-../miniscript2}"
OBJ_DIR="build-wasm/obj"
OUT_DIR="dist"

for arg in "$@"; do
	case "$arg" in
		clean) rm -rf build-wasm ;;
		debug) DEBUG=1 ;;
	esac
done

if ! command -v emcc &> /dev/null; then
	if [ -n "$EMSDK_DIR" ] && [ -f "$EMSDK_DIR/emsdk_env.sh" ]; then
		source "$EMSDK_DIR/emsdk_env.sh" > /dev/null 2>&1
	fi
fi
if ! command -v emcc &> /dev/null; then
	echo "Error: emcc not found.  Activate emsdk, or set EMSDK_DIR to your emsdk folder." >&2
	exit 1
fi
if [ ! -f "$MS2_DIR/cpp/miniscript.h" ]; then
	echo "Error: MiniScript 2 not found at $MS2_DIR (set MS2_DIR)." >&2
	exit 1
fi

if [ -n "$DEBUG" ]; then
	OPT="-O0 -g"
else
	OPT="-O3 -DNDEBUG"
fi
CXXFLAGS="-std=gnu++14 $OPT -I$MS2_DIR/cpp -I$MS2_DIR/cpp/core -I$MS2_DIR/generated"
CFLAGS="-std=gnu99 $OPT -I$MS2_DIR/cpp/core"

# Sources: MS2's core runtime and transpiled code (minus App.g.cpp, which has
# its own main, and the test/debug programs), plus our host.
SOURCES=$(ls "$MS2_DIR"/cpp/core/*.cpp "$MS2_DIR"/cpp/core/*.c "$MS2_DIR"/generated/*.g.cpp 2>/dev/null \
	| grep -v -e '/core/test_' -e '/core/debug_' -e '/generated/App\.g\.cpp$')
SOURCES="$SOURCES wasm/web_host.cpp"

mkdir -p "$OBJ_DIR" "$OUT_DIR"

# Compile (in parallel) whatever is out of date.  Headers aren't tracked; use
# "clean" after pulling MiniScript 2 changes that touch only headers.
export CXXFLAGS CFLAGS OBJ_DIR
compile_one() {
	src="$1"
	obj="$OBJ_DIR/$(echo "$src" | tr '/.' '__').o"
	if [ "$obj" -nt "$src" ]; then exit 0; fi
	echo "  $src"
	case "$src" in
		*.c) emcc $CFLAGS -c "$src" -o "$obj" ;;
		*)   em++ $CXXFLAGS -c "$src" -o "$obj" ;;
	esac
}
export -f compile_one
echo "Compiling..."
echo "$SOURCES" | tr ' ' '\n' | grep -v '^$' | xargs -P 8 -I{} bash -c 'compile_one "$@"' _ {}

echo "Linking..."
em++ $OPT "$OBJ_DIR"/*.o -o "$OUT_DIR/ms2-engine.js" \
	-sMODULARIZE=1 \
	-sEXPORT_NAME=createMS2Engine \
	-sENVIRONMENT=web,node \
	-sALLOW_MEMORY_GROWTH=1 \
	-sSTACK_SIZE=5242880 \
	-sEXPORTED_FUNCTIONS=_ms_init,_ms_load,_ms_run,_ms_provideInput,_ms_provideFile,_ms_stop,_ms_clearImportCache,_malloc,_free \
	-sEXPORTED_RUNTIME_METHODS=ccall,cwrap,UTF8ToString

ls -l "$OUT_DIR"/ms2-engine.*
echo "Done."
