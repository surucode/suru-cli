import { Task, SuruBit } from "core";
import { TaskBuilder } from "./TaskBuilder";

import { __tasks, __current_task } from "core/private";

export class Suru {
  private [__tasks]: { [name: string]: Task } = {};
  private [__current_task]: Task | null = null;
  public bits: {
    [name: string]: ((...args: any[]) => void);
  } = {};

  public task(defTaskFn: Function): Function {
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

  public static register(): Suru {
    if (!("suru" in global)) {
      const shimasu = new Suru();

      Object.defineProperties(global, {
        suru: { get: () => shimasu },
        task: { get: () => shimasu.task.bind(shimasu) },
        invoke: { get: () => shimasu.invoke.bind(shimasu) },
        bit: { get: () => shimasu.bit.bind(shimasu) }
      });
    }

    return global.suru;
  }

  public registerBit(name: string, bit: SuruBit): Suru {
    this.bits[name] = (...args: any[]) => {
      if (!(this[__current_task] instanceof Task)) {
        throw new Error(
          `Cannot call ${name}. Task bits functions can only be called when defining a task.`
        );
      }
      void bit(...args)(this[__current_task]);
    };

    return this;
  }

  public static registerBit(name: string, bit: SuruBit): Suru {
    return Suru.register().registerBit(name, bit);
  }

  public bit(bit: string): Suru {
    const req = __non_webpack_require__ || require;
    req(req.resolve(`${bit}/register`) ? `${bit}/register` : bit);

    return this;
  }
}

declare global {
  namespace NodeJS {
    export interface Global {
      suru: Suru;

      bit(name: string): void;
      task(defTaskFn: Function): Function;
      invoke(taskName: string): Function;
    }
  }
}
