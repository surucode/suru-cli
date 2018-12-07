import { Suru, SuruBit, Task } from "core";

type TaskRunFn = (...args: any[]) => any;

export const RunBit: SuruBit = (runFn: TaskRunFn) => (t: Task) => {
  const prevRun = (t.runFn || (() => {})).bind(t);

  t.runFn = (...args: string[] | [{ [name: string]: any }]) => {
    prevRun(...args);
    runFn(...args);
  };
};
