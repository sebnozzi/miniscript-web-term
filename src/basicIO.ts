import { Runtime } from "miniscript-ts";
import { Terminal } from "@xterm/xterm";
import { Readline } from "xterm-readline";

export class BasicIO {
  
  constructor(
    private xterm: Terminal,
    private readline: Readline) {

  }

  addIntrinsics(runtime: Runtime) {
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

    if (txt === undefined || txt === null) {
      txt = "";
    }

    if (delim !== null && delim !== "\n" && delim !== "\r") {
      txt = txt + delim;
      this.xterm.write(txt);
    } else {
      this.xterm.writeln(txt);
    }

  }

  private async input(prompt: string | null): Promise<string> {
    if (prompt === null) {
      prompt = "";
    }
    return this.readline.read(prompt).then((txt) => {
      return txt;
    });
  }

}