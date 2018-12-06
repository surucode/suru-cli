import { spawnSync } from "child_process";
import { SuruBit, Task, Suru } from "core";

export const ShellBitArgs = Symbol("ShellBitArgs");

const ShellBit: SuruBit = (program: string, ...args: Array<string|Symbol>) => (t: Task) => {
  const prevRun = (t.runFn || (() => {})).bind(t);

  t.runFn = (...runArgs: any[]) => {
    prevRun(...runArgs);
    const shell_args_pos = args.indexOf(ShellBitArgs);

    console.log(
      shell_args_pos,
      shell_args_pos >= 0
        ? [
            ...args.slice(0, shell_args_pos),
            ...runArgs[0],
            ...args.slice(shell_args_pos + 1)
          ]
        : args
    );

    spawnSync(
      program,
      shell_args_pos >= 0
        ? [
            ...args.slice(0, shell_args_pos),
            ...runArgs[0],
            ...args.slice(shell_args_pos + 1)
          ]
        : args,
      { cwd: __dirname, stdio: "inherit" }
    );
  };
};

ShellBit.register = () => {
  const suru = Suru.register();
  suru.registerBit("shell", ShellBit);
  (<any>suru.bits.shell).args = ShellBitArgs;
};

export { ShellBit };

declare global {
  namespace NodeJS {
    export interface Global {
      shell(program: string, ...args: Array<string | Symbol>): void;
    }
  }
}
