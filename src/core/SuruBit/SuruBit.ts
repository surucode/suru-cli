import { Task } from "core";

type SuruBitFunc = (...args: any[]) => (t: Task) => void;

export interface SuruBit extends SuruBitFunc {
    register: () => void;
}