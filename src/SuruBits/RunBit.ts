import {SuruBit} from "./SuruBit"

  export class RunBit extends SuruBit {
    constructor(public runFn: Function) {
      super();
    }
  }
