import { BlobReader, ZipReader, TextWriter } from "@zip.js/zip.js";
import { MSFileSystem } from "./fileSystem";

export class ZipFileSystem extends MSFileSystem {

  private initialized: boolean;
  private fsEntries: Map<string, string>;

  constructor(private zipFilePath: string) {
    super();
    this.initialized = false;
    this.fsEntries = new Map();
  }

  private async init() {
    if (this.initialized) {
      return;
    }

    fetch(this.zipFilePath).then((response) => {
      return response.blob();
    }).then(async (blob: Blob) => {
      const zipFileReader = new BlobReader(blob);
      const zipReader = new ZipReader(zipFileReader);
      const entries = await zipReader.getEntries();
      for (let entry of entries) {
        if (!entry.directory && entry.getData) {
          const writer = new TextWriter();
          const text = await entry.getData(writer);
          this.fsEntries.set(entry.filename, text);
        }
      }
      await zipReader.close();
    });
  }

  async getLocalSource(fileName: string): Promise<string> {
    await this.init();
    const src = this.fsEntries.get(fileName);
    if (src === undefined) {
      throw new Error("File not found: " + fileName);
    }
    return src;
  }

  async getLibSource(fileName: string): Promise<string> {
    await this.init();
    const src = this.fsEntries.get("lib/" + fileName);
    if (src === undefined) {
      throw new Error("File not found: " + fileName);
    }
    return src;
  }

}