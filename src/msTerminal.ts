
import { CooperativeRunner, Interpreter } from "miniscript-ts";
import { Terminal } from "@xterm/xterm";
import { Readline } from "xterm-readline";
import { BasicIO } from "./basicIO";
import { ModuleLoader } from "./moduleLoader";


export class MSTerminal {

  interp: Interpreter;

  constructor() {
    const outCallback = (txt: string) => {
      console.log(txt);
    }
    this.interp = new Interpreter(outCallback, outCallback);
    
    const [terminal, readine] = this.setupTerminal();
    this.addIntrinsics(terminal, readine);
  }

  private addIntrinsics(terminal: Terminal, readline: Readline) {
    const runtime = this.interp.runtime;

    const moduleLoader = new ModuleLoader(this.interp);
    const basicIO = new BasicIO(terminal, readline);

    moduleLoader.addIntrinsics(runtime);
    basicIO.addIntrinsics(runtime);
  }

  private setupTerminal(): [Terminal, Readline] {
    const rl = new Readline();
    const term = new Terminal({
      /*
      theme: {
            background: "#191A19",
            foreground: "#F5F2E7",
      },*/
      cursorBlink: true,
      cursorStyle: "block"
    });

    
    const container = document.getElementById('term_demo') as HTMLElement;

    term.loadAddon(rl);
    term.open(container);

    term.focus();

    return [term, rl];
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
