import { TaskOptions } from "./TaskOptions";
import { ArgConfig } from "./ArgConfig";
import { SuruBit } from "./SuruBits/SuruBit";

import { ArgumentParser } from "argparse";

export class Task {
  public name?: string;
  public desc?: string;
  public args: Array<ArgConfig> = [];
  public pipeline: Array<SuruBit> = [];
  public runFn: Function = () => {};
  public options: TaskOptions = new TaskOptions();
  public argParser?: ArgumentParser;

  public run(args : Array<string>) {
    this.runFn(
      this.options.raw_args ? { args } : this.argParser!.parseArgs(args)
    );
  }
}
