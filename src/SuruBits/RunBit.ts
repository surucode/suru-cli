import { SuruBit } from "./SuruBit";
import { Suru } from "../Suru";
import { Task } from "../Task";

export class RunBit extends SuruBit {
  constructor(public runFn: Function) {
    super();
  }

  public buildTask(t: Task) {
    t.runFn = this.runFn;
  }
  
  static register() {
    Suru.registerBit("run", (runFn: Function) => new RunBit(runFn));
  }
}