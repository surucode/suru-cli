import { ArgumentParserOptions } from "argparse";

export class ArgConfig {
    public arg: string | string[];
    public options: Object;

   constructor(arg: string | string[], options: ArgumentParserOptions) {
      this.arg = arg;
      this.options = options;
    }
  }
