import { SuruBit } from "core";

import { ArgumentParser } from "argparse";
import { TaskOptions } from "./TaskOptions";

export class Task {
  public name?: string;
  public desc?: string;
  public pipeline: SuruBit[] = [];
  public options: TaskOptions = new TaskOptions();
  public argParser: ArgumentParser = new ArgumentParser();
  public runFn: Function = () => {};

  public run(args: string[]) {
    this.runFn(
      this.options.raw_args ? { args } : this.argParser.parseArgs(args)
    );
  }
}
