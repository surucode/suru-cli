import { Suru, SuruBit, Task } from "core";

export class DescBit extends SuruBit {

  public static register() {
    Suru.registerBit("desc", (desc: string) => new DescBit(desc));
  }
  constructor(private desc: string) {
    super();
  }

  public buildTask(t: Task) {
    t.desc = this.desc;
    (t.argParser as any).desc = t.desc;
  }
}
