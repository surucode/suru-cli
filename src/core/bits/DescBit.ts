import { Suru, SuruBit, Task } from "core";

const DescBit: SuruBit = (desc: string) => (t: Task) => {
  t.desc = desc;
};
DescBit.register = () => void Suru.register().registerBit("desc", DescBit);

export { DescBit };

declare global {
  namespace NodeJS {
    export interface Global {
      desc(desc: string): void;
    }
  }
}
