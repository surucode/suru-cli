export { ArgBit } from "./src/ArgBit";
export { RawArgsBit } from "./src/RawArgsBit";

declare global {
  namespace NodeJS {
    export interface Global {
      arg(arg: string | string[], opts: Object): void;
      raw_args(): void;
    }
  }
}