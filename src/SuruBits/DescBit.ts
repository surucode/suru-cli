import { SuruBit } from "./SuruBit";
import { Suru } from "../Suru";
import { Task } from "../Task";

export class DescBit extends SuruBit {
  constructor(private desc: string) {
    super();
  }

  public buildTask(t: Task) {
    t.desc = this.desc;
    (<any>t.argParser)["desc"] = t.desc;
  }
  
  static register() {
    Suru.registerBit("desc", (desc: string) => new DescBit(desc));
  }
}