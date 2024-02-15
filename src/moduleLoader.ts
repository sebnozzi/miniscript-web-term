import { Interpreter, Runtime } from "miniscript-ts";

export class ModuleLoader {

  constructor(private interp: Interpreter) {

  }

  addIntrinsics(runtime: Runtime) {
    const outerThis = this;

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

  private fetchCode(moduleName: string): Promise<string> {
    const moduleFileName = `${moduleName}.ms`;
    // Try fetching first at the "local" project path (same as
    // "current directory").
    const workingDirUrl =  this.resolveLocalUrl(moduleFileName);
    const responsePromise = fetch(workingDirUrl).then((response) => {
      if (response.status == 200) {
        return new Promise<Response>((resolve) => {resolve(response)});
      } else {
        console.info("The above HTTP failed request is normal. Trying to fetch system lib ...")
        // Try then fetching from system libraries
        const sysDirUrl =  this.resolveSysLibUrl(moduleFileName);
        return fetch(sysDirUrl);
      }
    });
    // Convert to text if the response is valid
    const textPromise = responsePromise.then<string>((response) => {
      if (response.status == 200) {
        return response.text();
      } else {
        const msg = `Fetching module ${moduleFileName} failed.`;
        console.error(msg, response);
        throw new Error(msg);
      }
    });
    
    return textPromise;
  }

  private resolveLocalUrl(moduleFileName: string): string {
    return moduleFileName;
  }

  private resolveSysLibUrl(moduleFileName: string): string {
    return "lib/" + moduleFileName;
  }

  private runSrcAsModule(moduleName: string, srcCode: string): Promise<void> {
    // TODO: this might be wrong ... the original "runner" should be used
    const runPromise =  this.interp.runSrcAsModule(moduleName, srcCode);
    return runPromise;
  }

}