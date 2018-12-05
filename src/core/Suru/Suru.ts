import { Task } from "core";
import { TaskBuilder } from "./TaskBuilder";

import { __tasks, __current_task } from "core/private";

export class Suru {
  private [__tasks]: { [name: string]: Task } = {};
  private [__current_task]: Task | null = null;

  public task(defTaskFn: Function) {
    return TaskBuilder.call(this, defTaskFn);
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

  public static register() {
    if (!("suru" in global)) {
      const shimasu = new Suru();

      Object.defineProperties(global, {
        suru: { get: () => shimasu },
        task: { get: () => shimasu.task.bind(shimasu) },
        invoke: { get: () => shimasu.invoke.bind(shimasu) }
      });
    }

    return global.suru;
  }

  public registerBit(name: string, bitBuilder: Function) {
    if (!(name in global)) {
      Object.defineProperty(global, name, {
        get: () => (...args: any[]) => {
          this.assertDefiningTask(name);
          this[__current_task]!.pipeline.push(bitBuilder(...args));
        }
      });
    }
  }

  public static registerBit(name: string, bitBuilder: Function) {
    Suru.register().registerBit(name, bitBuilder);
  }

  private assertDefiningTask(name: string) {
    if (!(this[__current_task] instanceof Task)) {
      throw new Error(
        `Cannot call ${name}. Task bits functions can only be called when defining a task.`
      );
    }
  }
}

declare global {
  namespace NodeJS {
    export interface Global {
      suru: Suru;

      task(defTaskFn: Function): Function;
      invoke(taskName: string): Function;
    }
  }
}
