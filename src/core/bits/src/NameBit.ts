import { Suru, SuruBit, Task } from "core";

export const NameBit: SuruBit = (name: string) => (t: Task) => {
  t.name = name;
};