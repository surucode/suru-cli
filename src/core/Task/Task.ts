export class Task {
  public name?: string;
  public desc?: string;
  public runFn: (...args: any[]) => any = () => {};

  public run(...args: any[]) {
    this.runFn.call(this, ...args);
  }
}
