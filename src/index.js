const ArgumentParser = require("argparse").ArgumentParser;

const argParser = new ArgumentParser(
    {
        version: '0.0.1',
        description: 'する'
    });

const tasksArgsParsers = argParser.addSubparsers({
    title: 'tasks',
    dest: 'run_task'
});


const nameBit = Symbol.for("nameBit");
const descBit = Symbol.for("descBit");
const argBit = Symbol.for("argBit");
const runBit = Symbol.for("runBit");
const __current_task = Symbol.for("__current_task");
const __tasks = Symbol.for("__tasks");

global.task = (defTaskFn) => {
    global.task[__tasks] = global.task[__tasks] || {};

    const t = {
        name: null,
        desc: null,
        run: null,
        pipeline: []
    };

    const previousTask = global.task[__current_task] || null;
    global.task[__current_task] = t;

    defTaskFn();

    global.task[__current_task] = previousTask;

    const args = [];

    t.pipeline.forEach(bit => {
        if(typeof bit !== "object") {
            throw new Error(`Unknown element in task pipeline !\n${JSON.stringify(bit, null, 3)}`);
        }

        switch(bit._bit) {
            case nameBit:
                t.name = bit.name;
                break;
            case descBit:
                t.desc = bit.desc;
                break;
            case argBit:
                args.push(bit);
                break;
            case runBit:
                t.run = bit.runFn;
                break;
            default:
                console.error(bit);
                throw new Error(`Unknown bit type in task pipeline !\n${JSON.stringify(bit, null, 3)}`);
                break;
        }
    });

    if(!t.name || typeof t.name !== "string" || t.name.trim().length < 1) {
        throw new Error(`Task name should be a non-empty string! Got: ${t.name}`);
    }

    if(typeof t.run !== "function") {
        throw new Error(`Task run should be a function`);
    }

    const tArgs = tasksArgsParsers.addParser(t.name, {});
    args.forEach(bit => tArgs.addArgument(bit.arg, bit.opts));

    global.task[__tasks][t.name] = t;

    return t.run;
};

global.name = (name) => global.task[__current_task].pipeline.push({_bit: nameBit, name});
global.desc = (desc) => global.task[__current_task].pipeline.push({_bit: descBit, desc});
global.arg = (arg, opts) => global.task[__current_task].pipeline.push({_bit: argBit, arg, opts});
global.run = (runFn) => global.task[__current_task].pipeline.push({_bit: runBit, runFn});
global.invoke = (taskName) => {
    const t = global.task[__tasks][taskName];

    return t ? t.run : null;
}

require("../suru.js");

const args = argParser.parseArgs();

const runTask = global.invoke(args.run_task)

if(runTask) {
    runTask(args);
}
