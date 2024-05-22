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

	runtime.addIntrinsic('input(prompt=null)',
    function(prompt: string | null): Promise<string> {
      return outerThis.input(prompt);
    });
    
    runtime.addIntrinsic('version',
    function(): any {
		var result = runtime.newMap();
		result.set("miniscript", "1.6.2");
		result.set("buildDate", "1900-04-01");
		result.set("hostName", "miniscript-tryit");
		result.set("hostInfo", "https://github.com/JoeStrout/miniscript-tryit");
		return result;
    });
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