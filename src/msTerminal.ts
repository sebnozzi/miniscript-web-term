
import "../node_modules/@xterm/xterm/css/xterm.css";

import { CooperativeRunner, Interpreter } from "miniscript-ts";
import { Terminal } from "@xterm/xterm";
import { Readline } from "xterm-readline";
import { BasicIO } from "./basicIO";
import { ModuleLoader } from "./moduleLoader";
import { MSFileSystem } from "./fileSystems/fileSystem";

export class MSTerminal {

  interp: Interpreter;

  constructor(private fileSystem: MSFileSystem) {
    const outCallback = (txt: string) => {
      console.log(txt);
    }
    this.interp = new Interpreter(outCallback, outCallback);
    
    const [terminal, readine] = this.setupTerminal();
    this.addIntrinsics(terminal, readine);
  }

  private addIntrinsics(terminal: Terminal, readline: Readline) {
    const runtime = this.interp.runtime;

    const moduleLoader = new ModuleLoader(this.interp, this.fileSystem);
    const basicIO = new BasicIO(terminal, readline);

    moduleLoader.addIntrinsics();
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

  async runCode(mainFile: string): Promise<void> {
    return new Promise<void>(async (resolve) => {
      const srcCode = await this.fileSystem.getSource(mainFile);
      const coopRunner = this.interp.getCooperativeRunner(srcCode, mainFile);
      if (coopRunner) {
        this.runCycles(coopRunner, () => {
          resolve();
        });
      }
    });
  }

  private runCycles(coopRunner: CooperativeRunner, onFinished: () => void) {
    if (!coopRunner.isFinished()) {
      coopRunner.runSomeCycles();
      setTimeout(() => {
        this.runCycles(coopRunner, onFinished);
      }, 0);
    } else {
      onFinished();
    }
  }

}
