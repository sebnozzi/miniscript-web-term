
import { MSTerminal, TerminalOptions } from "./msTerminal";
import { HttpFileSystem } from "./fileSystems/httpFileSystem";
import { MSFileSystem } from "./fileSystems/fileSystem";

declare global {
  interface Window { terminalOptions: TerminalOptions | undefined; }
}

let msTerm: MSTerminal | null = null;

export async function runCodeFromPath(fileSystem, scriptFile) {
  if (!msTerm) msTerm = new MSTerminal(fileSystem, window.terminalOptions);
  window.xterm = msTerm.terminal;
  await msTerm.runCodeFromPath(scriptFile);
}

export async function runCodeFromString(sourceCode: string, fileSystem?: MSFileSystem) {
  if (!fileSystem) {
    // Resolve modules (and /lib) relative to the page, not the site root.
    const basePath = pageBasePath();
    fileSystem = new HttpFileSystem(basePath, basePath);
  }
  if (!msTerm) msTerm = new MSTerminal(fileSystem, window.terminalOptions);
  window.xterm = msTerm.terminal;
  await msTerm.runCodeFromString(sourceCode);
}

// Path of the folder containing this page, e.g. "/miniscript-tryit".
function pageBasePath(): string {
  return new URL(document.baseURI).pathname.split("/").slice(0, -1).join("/");
}

export function abortCodeRun() {
	if (msTerm) msTerm.abort();
}

// Export functions to the global scope
window.runCodeFromPath = runCodeFromPath;
window.runCodeFromString = runCodeFromString;
window.abortCodeRun = abortCodeRun;

addEventListener("DOMContentLoaded", async (_: Event) => {

  const body = document.querySelector("body") as HTMLBodyElement;
  const fileName = body.getAttribute("data-src-file");
  if (typeof fileName !== "string") {
    console.log("No source file specified on body tag");
    return;
  }

  const terminalOptions = window.terminalOptions;

  const [scriptBasePath, srcFile] = HttpFileSystem.splitPathAndFileName(fileName);
  const indexBasePath = pageBasePath();
  const fileSystem = new HttpFileSystem(indexBasePath, scriptBasePath);
  
  runCodeFromPath(fileSystem, srcFile);
});

