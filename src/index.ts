import { MSTerminal } from "./msTerminal";

jQuery(($: any, _: any) => {
  const msTerm = new MSTerminal();
  msTerm.setup();

  const body = document.querySelector("body") as HTMLBodyElement;
  const mainFile = body.getAttribute("data-src-file");
  if (typeof mainFile !== "string") {
    throw new Error("No source file specified!");
  }

  fetch(mainFile).then((response) => {
    return response.text();
  }).then((srcCode: string) => {
    msTerm.run(srcCode, mainFile);
  });

});
