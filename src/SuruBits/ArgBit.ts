import {SuruBit} from "./SuruBit"
import {ArgConfig} from "../ArgConfig"

export class ArgBit extends SuruBit {
    constructor(public argConfig: ArgConfig) {
      super();
    }
}