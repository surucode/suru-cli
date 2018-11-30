import { SuruBit } from "./SuruBit";
import { TaskOptions } from "../TaskOptions";


  export class OptsBit extends SuruBit {
    constructor(public options: TaskOptions) {
      super();
    }
  }
