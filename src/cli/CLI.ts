import { Suru } from "core";
import { ArgBit, DescBit, NameBit, OptsBit, RunBit } from "core/bits";

import { ArgumentParser } from "argparse";
import * as fs from "fs";

export function CLI() {
    // register Suru
    Suru.register();

    // Register core bits
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
        description: "する",
    });

    const tasksArgsParsers = argParser.addArgument("task");

    const args = argParser.parseArgs(process.argv.slice(2, 3));
    const rTask = global.suru.getTask(args.task);

    if (rTask) {
        rTask.run(process.argv.slice(3));
    }
}