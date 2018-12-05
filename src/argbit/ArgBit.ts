import { SuruBit } from "core";
import { ArgumentParser } from "argparse";
import { TaskWithArgs } from "./TaskWithArgs";

export const ArgBit: SuruBit = (arg: string | string[], opts: Object) => (t: TaskWithArgs) => {
  if (!t.argParser) {
    if(!t.name || typeof t.name !== "string" || t.name.trim().length < 1) {
      throw new Error("Task should have a name before calling ArgBit!");
    }

    t.argParser = new ArgumentParser({
      prog: `suru ${t.name}`,
      description: t.desc
    });

    const originalRun = t.run.bind(t);
    t.run = (...args: any[]) => {
      if (args.length === 1 && Array.isArray(args[0])) {
        const newArgs = t.argParser.parseArgs(args[0]);
        originalRun(
          newArgs
        );
      } else {
        originalRun(
        ...args
        );
      }
    };
  }

  t.argParser.addArgument(arg, opts);
};