import { MSFileSystem } from "./fileSystem";

export class HttpFileSystem extends MSFileSystem {

  static splitPathAndFileName(filePath: string): [string, string] {
    const parts = filePath.split("/").filter((s) => s);
    const path = parts.slice(0, parts.length - 1).join("/");
    const fileName = parts[parts.length - 1];
    return [path, fileName];
  }

  constructor(private basePath: string) {
    super();
  }

   async getSource(filePath: string): Promise<string> {
    const absolutePath = this.getAbsolutePath(filePath);
    return fetch(absolutePath).then((response) => {
      if (response.status == 200) {
        return response.text();
      } else {
        throw new Error("File not found: " + filePath);
      }
    }).then((text) => text);
  }

  private getAbsolutePath(filePath: string) {
    let absolutePath: string;
    if (filePath.startsWith("/")) {
      absolutePath = filePath;
    } else {
      absolutePath = this.basePath + "/" + filePath;
    }
    return absolutePath;
  }

}