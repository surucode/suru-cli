import { ArgumentParserOptions } from "argparse";

 export class ArgConfig {
    public arg: string | Array<string>;
    public options: Object;

    constructor(arg: string | Array<string>, options: Object) {
      this.arg = arg;
      this.options = options;
    }
  }
