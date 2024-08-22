export type Tasks = {
  tasks: string[]
}

export enum Command {
  ADD = "add",
  LIST = "list",
  DELETE = "delete",
  UPDATE = "update",
  HELP = 'help'
}