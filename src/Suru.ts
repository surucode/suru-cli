import { Task } from "./Task";
import { ArgConfig } from "./ArgConfig";
import { SuruBit } from "./SuruBits/SuruBit";
import { NameBit } from "./SuruBits/NameBit";
import { DescBit } from "./SuruBits/DescBit";
import { ArgBit } from "./SuruBits/ArgBit";
import { OptsBit } from "./SuruBits/OptsBit";
import { RunBit } from "./SuruBits/RunBit";
import { TaskOptions } from "./TaskOptions";

import { ArgumentParser } from "argparse";

const __current_task = Symbol("__current_task");
const __tasks = Symbol("__tasks");

export class Suru {
  private [__tasks]: { [name: string]: Task } = {};
  private [__current_task]: Task | null = null;

  public task(defTaskFn: Function) {
    const t = new Task();

    const previousTask: Task | null = this[__current_task];
    this[__current_task] = t;

    defTaskFn();

    this[__current_task] = previousTask;

    const args: Array<ArgConfig> = [];

    t.pipeline.forEach((bit: SuruBit) => {
      if (!(bit instanceof SuruBit)) {
        throw new Error(
          `Unknown element in task pipeline !\n${JSON.stringify(bit, null, 3)}`
        );
      }

      if (bit instanceof NameBit) {
        t.name = bit.name;
      } else if (bit instanceof DescBit) {
        t.desc = bit.desc;
      } else if (bit instanceof ArgBit) {
        args.push(bit.argConfig);
      } else if (bit instanceof RunBit) {
        t.runFn = bit.runFn;
      } else if (bit instanceof OptsBit) {
        t.options = { ...t.options, ...bit.options };
      } else {
        console.error(bit);
        throw new Error(
          `Unknown bit type in task pipeline !\n${JSON.stringify(bit, null, 3)}`
        );
      }
    });

    if (!t.name || typeof t.name !== "string" || t.name.trim().length < 1) {
      throw new Error(`Task name should be a non-empty string! Got: ${t.name}`);
    }

    if (typeof t.run !== "function") {
      throw new Error(`Task run should be a function`);
    }

    if (!t.argParser) {
      t.argParser = new ArgumentParser({
        prog: `suru ${t.name}`,
        description: t.desc
      });
    }

    args.forEach(({ arg, options }: ArgConfig) =>
      t.argParser!.addArgument(arg, options)
    );

    this[__tasks][t.name] = t;

    return t.runFn.bind(t);
  }

  private assertDefiningTask() {
    if (!(this[__current_task] instanceof Task)) {
      throw new Error(
        `Cannot call ${
          this.assertDefiningTask.caller.name
        }. Task bits functions can only be called when defining a task.`
      );
    }
  }

  public name(name: string) {
    this.assertDefiningTask();
    this[__current_task]!.pipeline.push(new NameBit(name));
  }

  public desc(desc: string) {
    this.assertDefiningTask();
    this[__current_task]!.pipeline.push(new DescBit(desc));
  }

  public arg(arg: string | Array<string>, opts: Object) {
    this.assertDefiningTask();
    this[__current_task]!.pipeline.push(new ArgBit(new ArgConfig(arg, opts)));
  }

  public opts(opts: TaskOptions) {
    this.assertDefiningTask();
    this[__current_task]!.pipeline.push(new OptsBit(opts));
  }
  public run(runFn: Function) {
    this.assertDefiningTask();
    this[__current_task]!.pipeline.push(new RunBit(runFn));
  }

  public getTask(taskName: string): Task {
    return this[__tasks][taskName];
  }

  public invoke(taskName: string): Function {
    const t = this.getTask(taskName);

    if (!(t instanceof Task)) {
      throw new Error(`Cannot find task named ${taskName}`);
    }

    return t.runFn.bind(t);
  }

  public static inject() {
    if (!("suru" in global)) {
      const shimasu = new Suru();

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
