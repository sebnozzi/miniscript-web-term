
import { MSTerminal, TerminalOptions } from "./msTerminal";
import { HttpFileSystem } from "./fileSystems/httpFileSystem";

declare global {
  interface Window { terminalOptions: TerminalOptions | undefined; }
}

let msTerm: MSTerminal | null = null;

export async function runCodeFromPath(fileSystem, scriptFile) {
  if (!msTerm) msTerm = new MSTerminal(fileSystem, window.terminalOptions);
  await msTerm.runCodeFromPath(scriptFile);
}

export async function runCodeFromString(sourceCode: string, fileSystem?:FileSystem) {
  if (!fileSystem) {
    fileSystem = new HttpFileSystem('', '');
  }
  if (!msTerm) msTerm = new MSTerminal(fileSystem, window.terminalOptions);
  try {
	  await msTerm.runCodeFromString(sourceCode);
  } catch (err) {
	  console.log("error caught");
  	  msTerm.terminal.writeln("Error found");
  }
}

// Export functions to the global scope
window.runCodeFromPath = runCodeFromPath;
window.runCodeFromString = runCodeFromString;

addEventListener("DOMContentLoaded", async (_: Event) => {

  const body = document.querySelector("body") as HTMLBodyElement;
  const fileName = body.getAttribute("data-src-file");
  if (typeof fileName !== "string") {
    console.log("No source file specified on body tag");
    return;
  }

  const terminalOptions = window.terminalOptions;

  const [scriptBasePath, srcFile] = HttpFileSystem.splitPathAndFileName(fileName);
  const indexBasePath = new URL(document.baseURI).pathname.split("/").slice(0,-1).join("/");
  const fileSystem = new HttpFileSystem(indexBasePath, scriptBasePath);
  
  runCodeFromPath(fileSystem, srcFile);
});

