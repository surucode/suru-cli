import { Suru } from "../Suru"

declare global {
   namespace NodeJS {
    export interface Global {
      suru: Suru;

      task(defTaskFn: Function): Function;
      invoke(taskName: string): Function;
    }
  }
}