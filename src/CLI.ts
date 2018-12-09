import { Suru } from "@surucode/suru-core";
import { ArgumentParser } from "argparse";

import { realpathSync } from "fs";
import { cwd } from "process"

export function CLI() {
  console.log("loading suru");
  
  // register Suru
  const shimasu = Suru.register();
  shimasu.bit("@surucode/suru-core/bits");
  shimasu.bit("@surucode/suru-shellbit");
  shimasu.bit("@surucode/suru-argbit");

  const suruPath = realpathSync(cwd() + "/suru.js");
  console.log("Loaded tasks from: " + suruPath);

  require(suruPath);

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
