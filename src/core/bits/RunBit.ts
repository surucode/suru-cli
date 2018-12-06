import { Suru, SuruBit, Task } from "core";

type TaskRunFn = (...args: any[]) => any;

export const RunBit: SuruBit = (runFn: TaskRunFn) => (t: Task) => {
  const prevRun = (t.runFn || (() => {})).bind(t);

  t.runFn = (...args: any[]) => {
    prevRun(...args);
    runFn(...args);
  };
};

RunBit.register = () => void Suru.register().registerBit("run", RunBit);

declare global {
  namespace NodeJS {
    export interface Global {
      run(runFn: Function): void;
    }
  }
}
