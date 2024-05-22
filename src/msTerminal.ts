
import "../node_modules/@xterm/xterm/css/xterm.css";

import { CooperativeRunner, Interpreter } from "miniscript-ts";
import { ITerminalInitOnlyOptions, ITerminalOptions, Terminal } from "@xterm/xterm";
import { Readline } from "xterm-readline";
import { BasicIO } from "./basicIO";
import { ModuleLoader } from "./moduleLoader";
import { MSFileSystem } from "./fileSystems/fileSystem";

export type TerminalOptions = ITerminalOptions & ITerminalInitOnlyOptions;

export class MSTerminal {

  interp: Interpreter;
  terminal: Terminal;

  constructor(private fileSystem: MSFileSystem, terminalOptions?: TerminalOptions) {
    const outCallback = (txt: string) => {
      this.terminal.writeln(txt);
    }
    this.interp = new Interpreter(outCallback, outCallback);
    
    const [terminal, readine] = this.setupTerminal(terminalOptions);
    this.addIntrinsics(terminal, readine);
    this.terminal = terminal;
  }

  private addIntrinsics(terminal: Terminal, readline: Readline) {
    const runtime = this.interp.runtime;

    const moduleLoader = new ModuleLoader(this.interp, this.fileSystem);
    const basicIO = new BasicIO(terminal, readline);

    moduleLoader.addIntrinsics();
    basicIO.addIntrinsics(runtime);
  }

  private setupTerminal(options?: TerminalOptions): [Terminal, Readline] {
    const rl = new Readline();
    const term = new Terminal(options);
    
    const container = document.getElementById('terminal') as HTMLElement;

    term.loadAddon(rl);
    term.open(container);

    term.focus();

    return [term, rl];
  }

  async runCodeFromPath(mainFile: string): Promise<void> {
    return new Promise<void>(async (resolve) => {
      const srcCode = await this.fileSystem.getSource(mainFile);
      const coopRunner = this.interp.getCooperativeRunner(srcCode, mainFile);
      if (coopRunner) {
        this.runCycles(coopRunner, (err) => {
          if (err) reject(err); else resolve();
        });
      }
    });
  }

  async runCodeFromString(srcCode: string): Promise<void> {
    return new Promise<void>(async (resolve) => {
	  const coopRunner = this.interp.getCooperativeRunner(srcCode, null);
	  if (coopRunner) {
		this.runCycles(coopRunner, (err) => {
		  if (err) reject(err); else resolve();
		});
	  } else {
		//console.error("runCodeFromString: unable to get coopRunner");
		reject(new Error("Unable to get coopRunner"));
	  }
    });
  }

  private runCycles(coopRunner: CooperativeRunner, onFinished: (err?: Error) => void) {
    if (!coopRunner.isFinished()) {
      try {
        coopRunner.runSomeCycles();
        setTimeout(() => { this.runCycles(coopRunner, onFinished); }, 0);
      } catch (err) {
        console.log('caught error in runCycles');
        onFinished(err);
      }
    } else {
      onFinished();
    }
  }

}
