import { Suru, SuruBit, Task } from "core";
import { TaskOptions } from "core/Task";

export class OptsBit extends SuruBit {
  public static register() {
    Suru.registerBit("opts", (opts: TaskOptions) => new OptsBit(opts));
  }
  constructor(public options: TaskOptions) {
    super();
  }

  public buildTask(t: Task) {
    t.options = {
      ...t.options,
      ...this.options,
    };
  }
}
