export { ShellBit, ShellBitArgs } from "./src/ShellBit";

type ShellBitArgs = Symbol;
type ShellBitFun = (program: string, ...args: Array<string | Symbol>) => void;
interface ShellBit extends ShellBitFun {
  args: ShellBitArgs;
}

declare global {
  namespace NodeJS {
    export interface Global {
      shell: ShellBit;
    }
  }
}
