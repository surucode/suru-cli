import { ArgumentParser } from "argparse";
import { Task } from "core";

export interface TaskWithArgs extends Task {
    argParser: ArgumentParser;
}