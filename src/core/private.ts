import { Task } from "core";

export const __current_task = Symbol("__current_task");
export const __tasks = Symbol("__tasks");

declare global {
  export interface Suru {
    [__current_task]: Task;
    [__tasks]: { [name: string]: Task };
  }
}
