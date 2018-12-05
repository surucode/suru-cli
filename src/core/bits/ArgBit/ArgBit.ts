import { Suru, SuruBit, Task } from "core";
import { ArgConfig } from "./ArgConfig";

export class ArgBit extends SuruBit {
  public static register() {
    Suru.registerBit(
      "arg",
      (arg: string | string[], opts: Object) =>
        new ArgBit(new ArgConfig(arg, opts))
    );
  }
  constructor(public argConfig: ArgConfig) {
    super();
  }

  public buildTask(t: Task) {
    t.argParser.addArgument(this.argConfig.arg, this.argConfig.options);
  }
}

declare global {
  namespace NodeJS {
    export interface Global {
      arg(arg: string | string[], opts: Object): void;
    }
  }
}