import Taskler from "./taskHandler"
import { Command } from "./types";

const tasker = new Taskler();

const [node, path, ...args] = process.argv

if (args) {
  const [cmd, ...rest] = args
  const command = cmd.toLowerCase()
  const params = rest.map(item => item.toLowerCase())
  console.log({ command, params })

  switch (command) {
    case Command.ADD:
      add(params)
      break;

    case Command.LIST:
      tasker.list()
      break;

    case Command.UPDATE:
      update(params)
      break;

    case Command.DELETE:
      remove(params);
      break;

    case Command.HELP:
      help()
      break;

    default:
      console.error(`'${command}' doesn't exist. Type help if you are lost.`)
      break;
  }
} else {
  console.error(
    `Tasker syntax is:
    tasker [command] [?task] [?id]`
  )
}

function add(args: string[]) {
  if (args.length === 0) return console.error(`Command Add should be: tasker add 'Task to add'`)
  const [task, ...ignore] = args
  tasker.add(task)
}

function update(args: string[]) {
  const errorMessage = `Command Update should be: tasker update 'task id' 'updated task'`

  if (args.length < 2) return console.error(errorMessage)

  const [update, maybeId, ...ignore] = args
  const id = parseInt(maybeId)

  if (isNaN(id)) return console.error("Task id should be an integer")
  tasker.update(id, update)
}

function remove(args: string[]) {
  const id = args.map(a => parseInt(a)).find(a => !isNaN(a))

  if (!id) return console.error("Task id should be an integer")

  tasker.delete(id)
}

function help() {
  const commands: Record<string, string> = {
    add: "Add a task",
    list: "List all tasks",
    update: "Update a task by id",
    delete: "Delete a task by id"
  }

  for (const key in commands) {
    console.log(`${key} .- ${commands[key]}`)
  }
}