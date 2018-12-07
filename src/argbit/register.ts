import { ArgBit, RawArgsBit } from "argbit";
import { Suru } from "core";

export default (): void => {
  void Suru.registerBit("arg", ArgBit);
  void Suru.registerBit("raw_args", RawArgsBit);
};