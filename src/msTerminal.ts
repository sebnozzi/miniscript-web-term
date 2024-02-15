///<reference path='../node_modules/jquery.terminal/js/jquery.terminal.d.ts' />

import { CooperativeRunner, Interpreter } from "miniscript-ts";
import { BasicIO } from "./basicIO";
import { ModuleLoader } from "./moduleLoader";


// Extend official type, which is missing the "width" parameter
type TOptions = JQueryTerminal.TerminalOptions & {
  width?: number
};


export class MSTerminal {

  interp: Interpreter;

  constructor() {
    const outCallback = (txt: string) => {
      console.log(txt);
    }
    this.interp = new Interpreter(outCallback, outCallback);
    
    const jqTerm = this.setupTerminal();
    this.addIntrinsics(jqTerm);
  }

  private addIntrinsics(jqTerm: JQueryTerminal) {
    const runtime = this.interp.runtime;

    const moduleLoader = new ModuleLoader(this.interp);
    const basicIO = new BasicIO(jqTerm);

    moduleLoader.addIntrinsics(runtime);
    basicIO.addIntrinsics(runtime);
  }

  private setupTerminal(): JQueryTerminal {
    const options = {
      name: 'ms_terminal',
      width: 800,
      height: 600,
      prompt: '] ',
      greetings: ""
    } as TOptions;

    const jq = $("#term_demo") as JQuery;
    const jqTerm = jq.terminal((_: string) => {
      // Don't do anything with the "command".
      // The "input" intrinsic passes the value 
      // back to the MiniScript machinery.
    }, options);

    // Initially pause the terminal until we explicitly tell it
    // to accept input, for the brief period of time in which the
    // "input" intrinsic is active.
    jqTerm.pause();

    return jqTerm;
  }

  runCode(srcCode: string, fileName: string) {
    const coopRunner = this.interp.getCooperativeRunner(srcCode, fileName);
    if (coopRunner) {
      this.runCycles(coopRunner);
    }
  }

  private runCycles(coopRunner: CooperativeRunner) {
    if (!coopRunner.isFinished()) {
      coopRunner.runSomeCycles();
      setTimeout(() => {
        this.runCycles(coopRunner);
      }, 0);
    } else {
      console.log("Finished");
    }
  }

}
