export type Tasks = {
  tasks: string[]
}

export enum Command {
  ADD = "add",
  LIST = "list",
  DELETE = "delete",
  REMOVE = "remove",
  UPDATE = "update",
  FINISH = "finish",
  DONE = "done",
  UNFINISH = "unfinish",
  UNDONE = "undone",
  HELP = 'help'
}