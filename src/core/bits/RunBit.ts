import { Suru, SuruBit, Task } from "core";

export class RunBit extends SuruBit {

  public static register() {
    Suru.registerBit("run", (runFn: Function) => new RunBit(runFn));
  }
  constructor(public runFn: Function) {
    super();
  }

  public buildTask(t: Task) {
    t.runFn = this.runFn;
  }
}
