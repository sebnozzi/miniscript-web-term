///<reference path='../node_modules/jquery.terminal/js/jquery.terminal.d.ts' />

import { CooperativeRunner, Interpreter } from "miniscript-ts";


// Extend official type, which is missing the "width" parameter
type TOptions = JQueryTerminal.TerminalOptions & {
  width?: number
};


export class MSTerminal {

  interp: Interpreter;
  jqTerm: JQueryTerminal;

  constructor() {
    const outCallback = (txt: string) => {
      console.log(txt);
    }
    this.jqTerm = undefined as unknown as JQueryTerminal;
    this.interp = new Interpreter(outCallback, outCallback);
    this.setupIntrinsics();
  }

  setup() {
    const outerThis = this;
    const options = {
      onInit: (terminal: JQueryTerminal) => {
        outerThis.onInit(terminal);
      },
      onAfterCommand: (command: string) => {
        outerThis.onAfterCommand(command);
      },
      name: 'ms_terminal',
      width: 800,
      height: 600,
      prompt: '] ',
      greetings: ""
    } as TOptions;

    const jq = $("#term_demo") as JQuery;
    const jqTerm = jq.terminal((command: string) => {
      outerThis.onCommand(command);
    }, options);

    this.jqTerm = jqTerm;
    jqTerm.pause();
  }

  private setupIntrinsics() {
    const runtime = this.interp.runtime;
    const outerThis = this;

    runtime.addIntrinsic('print(txt,delim=null)',
    function(txt: string, delim: string | null) {
      outerThis.print(txt, delim);
    });

    runtime.addIntrinsic('input(prompt=null)',
    function(prompt: string | null): Promise<string> {
      return outerThis.input(prompt);
    });
  }

  private print(txt: string, delim: string | null) {

    if (delim !== null && delim !== "\n" && delim !== "\r") {
      const options = {newline: false};
      txt = txt + delim;
      this.jqTerm.echo(txt, options);
    } else {
      this.jqTerm.echo(txt);
    }

  }

  private async input(prompt: string | null): Promise<string> {
    this.jqTerm.resume();
    if (prompt === null) {
      prompt = "";
    }
    return this.jqTerm.read(prompt).then((txt) => {
      this.jqTerm.pause();
      return txt;
    });
  }

  run(srcCode: string, fileName: string) {
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

  private onInit(term: JQueryTerminal) {
    //console.log("Init", term);
  }

  private onCommand(cmd: string) {
    //console.log("Command", cmd);

  }

  private onAfterCommand(cmd: string) {
    //console.log("After-Command", cmd);
  }

}
