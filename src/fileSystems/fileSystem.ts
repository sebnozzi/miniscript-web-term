
export abstract class MSFileSystem {

  abstract getSource(fileName: string): Promise<string>;

}