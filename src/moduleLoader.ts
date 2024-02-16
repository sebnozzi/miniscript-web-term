import { Interpreter, Runtime } from "miniscript-ts";
import { MSFileSystem } from "./fileSystems/fileSystem";

export class ModuleLoader {
  
  private runtime: Runtime;

  constructor(
    private interp: Interpreter,
    private fileSystem: MSFileSystem) {
      this.runtime = interp.runtime;
  }

  addIntrinsics() {
    const outerThis = this;
    const runtime = this.runtime;

    runtime.addIntrinsic('import(moduleName)',
    function(moduleName: string) {
      return outerThis.import(moduleName);
    });
  }

  private import(moduleName: string): Promise<void> {
    const fetchPromise = this.fetchCode(moduleName);
    const runPromise = fetchPromise.then((srcCode: string) => {
      return this.runSrcAsModule(moduleName, srcCode);
    });
    return runPromise;
  }

  private async fetchCode(moduleName: string): Promise<string> {
    const moduleFileName = `${moduleName}.ms`;
    const fileSystem = this.fileSystem;

    return fileSystem.getSource(moduleFileName).then((srcCode) => {
      return srcCode;
    }).catch(() => {
      console.info("The above HTTP failed request is normal. Trying to fetch system lib ...")
      return fileSystem.getSource("/lib/" + moduleFileName);
    }).catch(() => {
      throw new Error(`Failed to load module ${moduleName}`);
    })
  }

  private runSrcAsModule(moduleName: string, srcCode: string): Promise<void> {
    // TODO: this might be wrong ... the original "runner" should be used
    const runPromise =  this.interp.runSrcAsModule(moduleName, srcCode);
    return runPromise;
  }

}