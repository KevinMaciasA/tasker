import * as fs from "node:fs"
import { Tasks } from "./types";

type Options = {
  path: string
}

class Taskler {
  state: Tasks = {
    tasks: [],
  }
  options: Options = {
    path: "./tasks.json"
  };

  constructor(options?: Options) {
    if (options) this.addOptions(options)

    if (!fs.existsSync(this.options.path)) this.createJson()
    else this.load()
  }

  private addOptions(options: Options) {
    this.options = {
      ...this.options,
      ...options
    }
  }

  private createJson(): void {
    this.write(this.state)
  }

  private write(tasks: Tasks): void {
    const json = JSON.stringify(tasks)
    fs.writeFileSync(this.options.path, json, {
      encoding: 'utf8',
      flag: 'w'
    })
  }

  private read(): Tasks {
    const rawData = fs.readFileSync(this.options.path, {
      encoding: 'utf8'
    })
    return JSON.parse(rawData)
  }

  private load() {
    const tasks = this.read()
    this.state = tasks
  }

  add(task: string): void {
    this.state.tasks.push(task)
  }

  list() {
    if (this.state.tasks.length === 0) console.log("Good, you are done! There is no Task left.")
    else console.log(this.toString())
  }

  update(id: number, update: string): void {
    const index = id - 1
    const task = this.get(index)
    if (task) {
      this.set(index, update)
    } else {
      console.log(`Task with id ${id} doesn't exist`)
    }
  }

  delete(id: number) {
    const index = id - 1
    this.state.tasks = this.state.tasks.filter((_, i) => index != i)
  }

  size(): number {
    return this.state.tasks.length
  }

  private get(index: number): string | undefined {
    return this.state.tasks.at(index)
  }

  private set(index: number, value: string) {
    this.state.tasks[index] = value
  }

  toString() {
    const header = "Tasks:"
    const body = this.state.tasks.map((task, i) => (i + 1) + "- " + task).join("\n")

    return `${header}
${body}`
  }
}

export default Taskler