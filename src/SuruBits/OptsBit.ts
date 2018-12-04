import { SuruBit } from "./SuruBit";
import { TaskOptions } from "../TaskOptions";
import { Suru } from "../Suru";
import { Task } from "../Task";

export class OptsBit extends SuruBit {
  constructor(public options: TaskOptions) {
    super();
  }

  public buildTask(t: Task) {
    t.options = {
      ...t.options,
      ...this.options
    };
  }
  static register() {
    Suru.registerBit("opts", (opts: TaskOptions) => new OptsBit(opts));
  }
}
