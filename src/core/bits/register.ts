import { Suru } from "core";

import { DescBit } from ".";
import { NameBit } from ".";
import { RunBit } from ".";

export default () => {
  console.log("hello");
  void Suru.register()
    .registerBit("desc", DescBit)
    .registerBit("name", NameBit)
    .registerBit("run", RunBit);
};

declare global {
  namespace NodeJS {
    export interface Global {
      name(name: string): void;
      desc(desc: string): void;
      run(runFn: Function): void;
    }
  }
}
