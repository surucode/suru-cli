///<reference path="./DSL.ts" />

Suru.DSL.inject();

require("../suru.js");

const args = argParser.parseArgs(process.argv.slice(2, 3));
const rTask = global.suru[__tasks][args.run_task];

if (rTask) {
  const args = rTask.options.raw_args
    ? { args: process.argv.slice(3) }
    : argParser.parseArgs(process.argv.slice(2));

  rTask.run(args);
}
