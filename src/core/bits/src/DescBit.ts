import { Suru, SuruBit, Task } from "core";

export const DescBit: SuruBit = (desc: string) => (t: Task) => {
  t.desc = desc;
};
