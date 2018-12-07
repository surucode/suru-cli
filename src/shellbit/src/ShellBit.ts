import { cwd } from "process";
import { spawnSync } from "child_process";
import { SuruBit, Task, Suru } from "core";

type ShellBitArgs = Symbol;

export const ShellBitArgs: ShellBitArgs = Symbol("ShellBitArgs");

export const ShellBit: SuruBit = (
  program: string,
  ...args: Array<string | Symbol>
) => (t: Task) => {
  const prevRun = (t.runFn || (() => {})).bind(t);

  t.runFn = (...runArgs: any[]) => {
    prevRun(...runArgs);
    const shell_args_pos = args.indexOf(ShellBitArgs);

    console.log(
      shell_args_pos,
      shell_args_pos >= 0
        ? [
            ...args.slice(0, shell_args_pos),
            ...runArgs,
            ...args.slice(shell_args_pos + 1)
          ]
        : args
    );

    spawnSync(
      program,
      shell_args_pos >= 0
        ? [
            ...args.slice(0, shell_args_pos),
            ...runArgs,
            ...args.slice(shell_args_pos + 1)
          ]
        : args,
      { cwd: cwd(), stdio: "inherit" }
    );
  };
};
