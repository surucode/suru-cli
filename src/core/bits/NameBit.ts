import { Suru, SuruBit, Task } from "core";

export const NameBit : SuruBit = (name: string) => (t: Task) => {
  t.name = name;
};

declare global {
  namespace NodeJS {
    export interface Global {
      name(name: string): void;
    }
  }
}
