
import { MSTerminal } from "./msTerminal";
import { HttpFileSystem } from "./fileSystems/httpFileSystem";

addEventListener("DOMContentLoaded", async (_: Event) => {

  const body = document.querySelector("body") as HTMLBodyElement;
  const fileName = body.getAttribute("data-src-file");
  if (typeof fileName !== "string") {
    throw new Error("No source file specified!");
  }

  const [basePath, srcFile] = HttpFileSystem.splitPathAndFileName(fileName);
  const fileSystem = new HttpFileSystem(basePath);
  const mainFile = srcFile;

  const msTerm = new MSTerminal(fileSystem);
  await msTerm.runCode(mainFile);
  console.log("Finished");

});
