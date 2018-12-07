import { Suru } from "core";
import { ShellBit, ShellBitArgs } from ".";

export default () => {
  const suru = Suru.registerBit("shell", ShellBit);
  (<any>suru.bits.shell).args = ShellBitArgs;
};