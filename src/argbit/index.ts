export { ArgBit } from "./ArgBit";
export { TaskWithArgs } from "./TaskWithArgs";

declare global {
    namespace NodeJS {
        export interface Global {
            arg(arg: string | string[], opts: Object): void;
        }
    }
}