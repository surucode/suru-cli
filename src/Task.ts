namespace Suru {
  export class TaskOptions {
    public raw_args: Boolean = false;
  }

  export class Task {
    public name?: string;
    public desc?: string;
    public args: Array<ArgConfig> = [];
    public pipeline: Array<SuruBit> = [];
    public run: Function = () => {};
    public options: TaskOptions = new TaskOptions();
  }
}
