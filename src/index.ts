
import { MSTerminal, TerminalOptions } from "./msTerminal";
import { HttpFileSystem } from "./fileSystems/httpFileSystem";

declare global {
  interface Window { terminalOptions: TerminalOptions | undefined; }
}

export async function runCodeFromPath(fileSystem, scriptFile) {
  const msTerm = new MSTerminal(fileSystem, window.terminalOptions);
  await msTerm.runCodeFromPath(scriptFile);
  console.log("Finished");
}

export async function runCodeFromString(sourceCode: string, fileSystem?:FileSystem) {
  console.log("Running code:\n" + sourceCode);
  if (!fileSystem) {
    fileSystem = new HttpFileSystem('', '');
  }
  const msTerm = new MSTerminal(fileSystem, window.terminalOptions);
  await msTerm.runCodeFromString(sourceCode);
  console.log("Finished");
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
  console.log("Using script base-path:", scriptBasePath);
  console.log("Using index base-path:", indexBasePath);
  const fileSystem = new HttpFileSystem(indexBasePath, scriptBasePath);
  
  runCodeFromPath(fileSystem, srcFile);
});

