import { Suru } from "./Suru";
import { ArgumentParser } from "argparse";
import * as fs from "fs";

Suru.inject();
require(fs.realpathSync(process.cwd() + "/suru.js"));

const argParser = new ArgumentParser({
  version: "0.0.1",
  description: "する"
});

const tasksArgsParsers = argParser.addSubparsers({
  title: "tasks",
  dest: "run_task"
});

const args = argParser.parseArgs(process.argv.slice(2, 3));
const rTask = global.suru.getTask(args.run_task);

if (rTask) {
  rTask.run(process.argv.slice(3));
}
