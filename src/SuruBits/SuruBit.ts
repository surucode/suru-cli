import { Task } from "../Task";

export abstract class SuruBit {
  public buildTask(t: Task) {
    throw new Error("reduceTask should be implemented");
  }
}
