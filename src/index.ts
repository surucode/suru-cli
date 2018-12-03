import { Suru } from "./Suru";
import { ArgumentParser } from "argparse";
import * as fs from "fs";

Suru.inject();
const suruPath = fs.realpathSync(process.cwd() + "/suru.js");
console.log("Loaded tasks from: " + suruPath);
__non_webpack_require__(suruPath);

const argParser = new ArgumentParser({
  prog: `suru`,
  version: "0.0.1",
  description: "する"
});

const tasksArgsParsers = argParser.addArgument("run_task");

const args = argParser.parseArgs(process.argv.slice(2, 3));
const rTask = global.suru.getTask(args.run_task);

if (rTask) {
  rTask.run(process.argv.slice(3));
}
