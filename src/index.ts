
import { MSTerminal, TerminalOptions } from "./msTerminal";
import { HttpFileSystem } from "./fileSystems/httpFileSystem";

declare global {
  interface Window { terminalOptions: TerminalOptions | undefined; }
}

addEventListener("DOMContentLoaded", async (_: Event) => {

  const body = document.querySelector("body") as HTMLBodyElement;
  const fileName = body.getAttribute("data-src-file");
  if (typeof fileName !== "string") {
    throw new Error("No source file specified!");
  }

  const terminalOptions = window.terminalOptions;

  const [scriptBasePath, srcFile] = HttpFileSystem.splitPathAndFileName(fileName);
  const indexBasePath = new URL(document.baseURI).pathname.split("/").slice(0,-1).join("/");
  console.log("Using script base-path:", scriptBasePath);
  console.log("Using index base-path:", indexBasePath);
  const fileSystem = new HttpFileSystem(indexBasePath, scriptBasePath);
  const mainFile = srcFile;

  const msTerm = new MSTerminal(fileSystem, terminalOptions);
  await msTerm.runCode(mainFile);
  console.log("Finished");

});
