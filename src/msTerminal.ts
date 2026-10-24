import "../node_modules/@xterm/xterm/css/xterm.css";

import { ITerminalInitOnlyOptions, ITerminalOptions, Terminal } from "@xterm/xterm";
import { Readline } from "xterm-readline";
import { MS2Engine, EngineHost } from "./ms2Engine";
import { MSFileSystem } from "./fileSystems/fileSystem";
import { versionConfig } from "./version-config";

export type TerminalOptions = ITerminalOptions & ITerminalInitOnlyOptions;

export class MSTerminal implements EngineHost {

  terminal: Terminal;
  private readline: Readline;
  private engine: Promise<MS2Engine>;

  constructor(private fileSystem: MSFileSystem, terminalOptions?: TerminalOptions) {
    this.readline = new Readline();
    this.terminal = new Terminal({ convertEol: true, ...terminalOptions });
    this.terminal.loadAddon(this.readline);
    this.terminal.open(document.getElementById('terminal') as HTMLElement);
    this.terminal.focus();
    this.engine = MS2Engine.create(this, versionConfig);
  }

  async runCodeFromPath(mainFile: string): Promise<void> {
    const srcCode = await this.fileSystem.getSource(mainFile);
    await this.runCode(srcCode, mainFile);
  }

  async runCodeFromString(srcCode: string): Promise<void> {
    await this.runCode(srcCode, "");
  }

  async abort() {
    (await this.engine).stop();
  }

  private async runCode(srcCode: string, fileName: string) {
    const engine = await this.engine;
    engine.stop();               // in case a previous run is still going
    engine.clearImportCache();   // pick up any edits to modules
    await engine.run(srcCode, fileName);
  }

  // EngineHost methods, called by the engine:

  print(text: string, lineBreak: boolean, isError: boolean) {
    if (isError) text = `\x1b[31m${text}\x1b[0m`;
    if (lineBreak) this.terminal.writeln(text); else this.terminal.write(text);
  }

  async readLine(prompt: string): Promise<string | null> {
    return this.readline.read(prompt);
  }

  // Look for a module next to the script, then in the system lib folder.
  async loadModule(libname: string): Promise<string | null> {
    const moduleFileName = `${libname}.ms`;
    for (const path of [moduleFileName, `/lib/${moduleFileName}`]) {
      try {
        return await this.fileSystem.getSource(path);
      } catch {
        // not there; try the next place
      }
    }
    return null;
  }

}
