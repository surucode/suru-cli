"use strict";
var Suru;
(function (Suru) {
    class ArgConfig {
        constructor(arg, options) {
            this.arg = arg;
            this.options = options;
        }
    }
    Suru.ArgConfig = ArgConfig;
})(Suru || (Suru = {}));
var Suru;
(function (Suru) {
    class SuruBit {
    }
    Suru.SuruBit = SuruBit;
})(Suru || (Suru = {}));
///<reference path="./SuruBit.ts" />
var Suru;
///<reference path="./SuruBit.ts" />
(function (Suru) {
    class NameBit extends Suru.SuruBit {
        constructor(name) {
            super();
            this.name = name;
        }
    }
    Suru.NameBit = NameBit;
})(Suru || (Suru = {}));
///<reference path="./SuruBit.ts" />
var Suru;
///<reference path="./SuruBit.ts" />
(function (Suru) {
    class DescBit extends Suru.SuruBit {
        constructor(desc) {
            super();
            this.desc = desc;
        }
    }
    Suru.DescBit = DescBit;
})(Suru || (Suru = {}));
///<reference path="./SuruBit.ts" />
var Suru;
///<reference path="./SuruBit.ts" />
(function (Suru) {
    class ArgBit extends Suru.SuruBit {
        constructor(argConfig) {
            super();
            this.argConfig = argConfig;
        }
    }
    Suru.ArgBit = ArgBit;
})(Suru || (Suru = {}));
///<reference path="./SuruBit.ts" />
var Suru;
///<reference path="./SuruBit.ts" />
(function (Suru) {
    class OptsBit extends Suru.SuruBit {
        constructor(options) {
            super();
            this.options = options;
        }
    }
    Suru.OptsBit = OptsBit;
})(Suru || (Suru = {}));
///<reference path="./SuruBit.ts" />
var Suru;
///<reference path="./SuruBit.ts" />
(function (Suru) {
    class RunBit extends Suru.SuruBit {
        constructor(runFn) {
            super();
            this.runFn = runFn;
        }
    }
    Suru.RunBit = RunBit;
})(Suru || (Suru = {}));
///<reference path="./SuruBits/NameBit.ts" />
///<reference path="./SuruBits/DescBit.ts" />
///<reference path="./SuruBits/ArgBit.ts" />
///<reference path="./SuruBits/OptsBit.ts" />
///<reference path="./SuruBits/RunBit.ts" />
const ArgumentParser = require("argparse").ArgumentParser;
const argParser = new ArgumentParser({
    version: "0.0.1",
    description: "する"
});
const tasksArgsParsers = argParser.addSubparsers({
    title: "tasks",
    dest: "run_task"
});
const __current_task = Symbol("__current_task");
const __tasks = Symbol("__tasks");
var Suru;
(function (Suru) {
    var _a, _b;
    class DSL {
        constructor() {
            this[_a] = {};
            this[_b] = null;
        }
        task(defTaskFn) {
            const t = new Suru.Task();
            const previousTask = this[__current_task];
            this[__current_task] = t;
            defTaskFn();
            this[__current_task] = previousTask;
            const args = [];
            t.pipeline.forEach((bit) => {
                if (!(bit instanceof Suru.SuruBit)) {
                    throw new Error(`Unknown element in task pipeline !\n${JSON.stringify(bit, null, 3)}`);
                }
                if (bit instanceof Suru.NameBit) {
                    t.name = bit.name;
                }
                else if (bit instanceof Suru.DescBit) {
                    t.desc = bit.desc;
                }
                else if (bit instanceof Suru.ArgBit) {
                    args.push(bit.argConfig);
                }
                else if (bit instanceof Suru.RunBit) {
                    t.run = bit.runFn;
                }
                else if (bit instanceof Suru.OptsBit) {
                    t.options = Object.assign({}, t.options, bit.options);
                }
                else {
                    console.error(bit);
                    throw new Error(`Unknown bit type in task pipeline !\n${JSON.stringify(bit, null, 3)}`);
                }
            });
            if (!t.name || typeof t.name !== "string" || t.name.trim().length < 1) {
                throw new Error(`Task name should be a non-empty string! Got: ${t.name}`);
            }
            if (typeof t.run !== "function") {
                throw new Error(`Task run should be a function`);
            }
            const tArgs = tasksArgsParsers.addParser(t.name, {});
            args.forEach(({ arg, options }) => tArgs.addArgument(arg, options));
            this[__tasks][t.name] = t;
            return t.run;
        }
        assertDefiningTask() {
            if (!(this[__current_task] instanceof Suru.Task)) {
                throw new Error(`Cannot call ${this.assertDefiningTask.caller.name}. Task bits functions can only be called when defining a task.`);
            }
        }
        name(name) {
            this.assertDefiningTask();
            this[__current_task].pipeline.push(new Suru.NameBit(name));
        }
        desc(desc) {
            this.assertDefiningTask();
            this[__current_task].pipeline.push(new Suru.DescBit(desc));
        }
        arg(arg, opts) {
            this.assertDefiningTask();
            this[__current_task].pipeline.push(new Suru.ArgBit(new Suru.ArgConfig(arg, opts)));
        }
        opts(opts) {
            this.assertDefiningTask();
            this[__current_task].pipeline.push(new Suru.OptsBit(opts));
        }
        run(runFn) {
            this.assertDefiningTask();
            this[__current_task].pipeline.push(new Suru.RunBit(runFn));
        }
        invoke(taskName) {
            const t = this[__tasks][taskName];
            if (!(t instanceof Suru.Task)) {
                throw new Error(`Cannot find task named ${taskName}`);
            }
            return t.run;
        }
        static inject() {
            if (!("suru" in global)) {
                const shimasu = new DSL();
                Object.defineProperties(global, {
                    suru: { get: () => shimasu },
                    task: { get: () => shimasu.task.bind(shimasu) },
                    name: { get: () => shimasu.name.bind(shimasu) },
                    arg: { get: () => shimasu.arg.bind(shimasu) },
                    opts: { get: () => shimasu.opts.bind(shimasu) },
                    run: { get: () => shimasu.run.bind(shimasu) },
                    desc: { get: () => shimasu.desc.bind(shimasu) },
                    invoke: { get: () => shimasu.invoke.bind(shimasu) }
                });
            }
        }
    }
    _a = __tasks, _b = __current_task;
    Suru.DSL = DSL;
})(Suru || (Suru = {}));
var Suru;
(function (Suru) {
    class TaskOptions {
        constructor() {
            this.raw_args = false;
        }
    }
    Suru.TaskOptions = TaskOptions;
    class Task {
        constructor() {
            this.args = [];
            this.pipeline = [];
            this.run = () => { };
            this.options = new TaskOptions();
        }
    }
    Suru.Task = Task;
})(Suru || (Suru = {}));
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
//# sourceMappingURL=suru.js.map