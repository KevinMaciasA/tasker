export type Tasks = {
  tasks: string[]
}

export enum Command {
  ADD = "add",
  LIST = "list",
  DELETE = "delete",
  REMOVE = "remove",
  UPDATE = "update",
  HELP = 'help'
}