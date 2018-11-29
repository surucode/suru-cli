declare namespace NodeJS {
  export interface Global {
    suru: Suru.Suru;

    task(defTaskFn: Function): Function;
    name(name: string): void;
    desc(desc: string): void;
    opts(opts: Object): void;
    arg(arg: string | Array<String>, options: Object): void;
    run(runFn: Function): void;
    invoke(taskName: string): Function;
  }
}
