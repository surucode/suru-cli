import { Suru, SuruBit, Task } from "core";

export class NameBit extends SuruBit {

  public static register() {
    Suru.registerBit("name", (name: string) => new NameBit(name));
  }
  constructor(public name: string) {
    super();
  }

  public buildTask(t: Task) {
    t.name = this.name;
    (t.argParser as any).prog = `suru ${t.name}`;
  }
}
