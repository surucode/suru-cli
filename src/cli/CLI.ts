import { Suru } from "core";
import { ArgBit } from "argbit";
import { DescBit, NameBit, RunBit } from "core/bits";

import { ArgumentParser } from "argparse";
import * as fs from "fs";

export function CLI() {
  // register Suru
  Suru
    .register()
    .registerBit("desc", DescBit)
    .registerBit("name", NameBit)
    .registerBit("arg", ArgBit)
    .registerBit("run", RunBit);

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
    rTask.run(process.argv.slice(3));
  }
}
