import { Suru } from "./Suru";

import { ArgBit } from "./SuruBits/ArgBit";
import { DescBit } from "./SuruBits/DescBit";
import { NameBit } from "./SuruBits/NameBit";
import { OptsBit } from "./SuruBits/OptsBit";
import { RunBit } from "./SuruBits/RunBit";

import { ArgumentParser } from "argparse";
import * as fs from "fs";

Suru.register();
ArgBit.register();
DescBit.register();
NameBit.register();
OptsBit.register();
RunBit.register();

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
