import { MSTerminal } from "./msTerminal";

jQuery(($: any, _: any) => {
  const msTerm = new MSTerminal();
  msTerm.setup();

  const mainFile = "demo.ms";

  fetch(mainFile).then((response) => {
    return response.text();
  }).then((srcCode: string) => {
    msTerm.run(srcCode, mainFile);
  });

});
