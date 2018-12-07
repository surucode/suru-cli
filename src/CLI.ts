import { Suru } from "core";
import { DescBit, NameBit, RunBit } from "core/bits";

import { ArgumentParser } from "argparse";
import * as fs from "fs";

export function CLI() {
  console.log("loading suru");
  
  // register Suru
  const shimasu = Suru.register();
  shimasu.bit("core/bits");
  shimasu.bit("shellbit");
  shimasu.bit("argbit");

  const suruPath = fs.realpathSync(process.cwd() + "/suru.js");
  console.log("Loaded tasks from: " + suruPath);

  (__non_webpack_require__ || require)(suruPath);

  const argParser = new ArgumentParser({
    prog: `suru`,
    version: "0.0.1",
    description: "する"
  });

  argParser.addArgument("task");

  const args = argParser.parseArgs(process.argv.slice(2, 3));
  const rTask = global.suru.getTask(args.task);

  if (rTask) {
    rTask.run(...process.argv.slice(3));
  }
}
