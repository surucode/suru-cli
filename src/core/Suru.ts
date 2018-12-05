import { SuruBit, Task } from "core";

const __current_task = Symbol("__current_task");
const __tasks = Symbol("__tasks");

export class Suru {

  public static registerBit(name: string, bitBuilder: Function) {
    Suru.register().registerBit(name, bitBuilder);
  }

  public static register() {
    if (!("suru" in global)) {
      const shimasu = new Suru();

      Object.defineProperties(global, {
        suru: { get: () => shimasu },
        task: { get: () => shimasu.task.bind(shimasu) },
        invoke: { get: () => shimasu.invoke.bind(shimasu) },
      });
    }

    return global.suru;
  }
  private [__tasks]: { [name: string]: Task } = {};
  private [__current_task]: Task | null = null;

  public task(defTaskFn: Function) {
    const t = new Task();

    const previousTask: Task | null = this[__current_task];
    this[__current_task] = t;

    defTaskFn();

    this[__current_task] = previousTask;

    t.pipeline.forEach((bit: SuruBit) => {
      if (!(bit instanceof SuruBit)) {
        throw new Error(
          `Unknown element in task pipeline !\n${JSON.stringify(bit, null, 3)}`,
        );
      }

      bit.buildTask(t);
    });

    if (!t.name || typeof t.name !== "string" || t.name.trim().length < 1) {
      throw new Error(`Task name should be a non-empty string! Got: ${t.name}`);
    }

    if (typeof t.run !== "function") {
      throw new Error(`Task run should be a function`);
    }

    this[__tasks][t.name] = t;

    return t.runFn.bind(t);
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

  public registerBit(name: string, bitBuilder: Function) {
    if (!(name in global)) {
      Object.defineProperty(global, name, {
        get: () => (...args: any[]) => {
          this.assertDefiningTask();
          this[__current_task]!.pipeline.push(bitBuilder(...args));
        },
      });
    }
  }

  private assertDefiningTask() {
    if (!(this[__current_task] instanceof Task)) {
      throw new Error(
        `Cannot call ${
          this.assertDefiningTask.caller.name
        }. Task bits functions can only be called when defining a task.`,
      );
    }
  }
}
