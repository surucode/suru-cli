import { SuruBit } from "./SuruBit";
import { ArgConfig } from "../ArgConfig";
import { Suru } from "../Suru";
import { Task } from "../Task";
import { ArgumentParser } from "argparse";

export class ArgBit extends SuruBit {
  constructor(public argConfig: ArgConfig) {
    super();
  }

  buildTask(t: Task) {
    t.argParser.addArgument(this.argConfig.arg, this.argConfig.options);
  }

  static register() {
    Suru.registerBit(
      "arg",
      (arg: string | Array<string>, opts: Object) =>
        new ArgBit(new ArgConfig(arg, opts))
    );
  }
}