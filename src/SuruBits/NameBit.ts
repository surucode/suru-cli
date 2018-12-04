import { SuruBit } from "./SuruBit";
import { Suru } from "../Suru";
import { Task } from "../Task";

export class NameBit extends SuruBit {
  constructor(public name: string) {
    super();
  }

  public buildTask(t: Task) {
    t.name = this.name;
    (<any>t.argParser)["prog"] = `suru ${t.name}`;
  }

  static register() {
    Suru.registerBit("name", (name: string) => new NameBit(name));
  }
}
