import { Task, SuruBit } from "core";
import { TaskBuilder } from "./TaskBuilder";

import { __tasks, __current_task } from "core/private";

export class Suru {
  private [__tasks]: { [name: string]: Task } = {};
  private [__current_task]: Task | null = null;
  public bits: {
    [name: string]: ((...args: any[]) => void);
  } = {};

  public task(defTaskFn: Function) {
    return TaskBuilder.call(this, defTaskFn);
  }

  public getTask(taskName: string): Task {
    return this[__tasks][taskName];
  }

  public invoke(taskName: string): Function {
    const task = this.getTask(taskName);

    if (!(task instanceof Task)) {
      throw new Error(`Cannot invoke task ! ${JSON.stringify(task, null, 3)}`);
    }

    return task.run.bind(task);
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

  public registerBit(name: string, bit: SuruBit) {
    this.bits[name] = (...args: any[]) => {
      this.assertDefiningTask(name);
      void bit(...args)(this[__current_task]);
    };

    return this;
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
