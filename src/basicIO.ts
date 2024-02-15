import { Runtime } from "miniscript-ts";

export class BasicIO {
  
  constructor(
    private jqTerm: JQueryTerminal) {

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

}