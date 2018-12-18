import { Suru } from "@surucode/suru-core";
import { ArgumentParser } from "argparse";
import { findSuruFile } from "./findSuruFile";

export function CLI() {
  // register Suru
  const shimasu = Suru.register();
  shimasu.bit("shellbit");
  shimasu.bit("argbit");

  const surufile = findSuruFile();

  if(surufile) {
    require(surufile);
  }
 
  const argParser = new ArgumentParser({
    prog: `suru`,
    version: "0.0.1",
    description: "する"
  });

  argParser.addArgument("task");

  const args = argParser.parseArgs(process.argv.slice(2, 3));
  const rTask = global.suru.getTask(`::${args.task}`);

  if (rTask) {
    rTask.run(...process.argv.slice(3));
  }
}
