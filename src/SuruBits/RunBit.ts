///<reference path="./SuruBit.ts" />

namespace Suru {
  export class RunBit extends SuruBit {
    constructor(public runFn: Function) {
      super();
    }
  }
}
