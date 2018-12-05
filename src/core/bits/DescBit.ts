import { SuruBit, Task } from "core";

export const DescBit : SuruBit = (desc: string) => (t: Task) => {
  t.desc = desc;
}

declare global {
  namespace NodeJS {
    export interface Global {
      desc(desc: string): void;
    }
  }
}