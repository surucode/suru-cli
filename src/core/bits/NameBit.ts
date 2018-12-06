import { Suru, SuruBit, Task } from "core";

const NameBit: SuruBit = (name: string) => (t: Task) => {
  t.name = name;
};

NameBit.register = () => void Suru.register().registerBit("name", NameBit);

export { NameBit };

declare global {
  namespace NodeJS {
    export interface Global {
      name(name: string): void;
    }
  }
}
