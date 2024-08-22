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
    this.write()
  }

  private write(): void {
    const json = JSON.stringify(this.state)
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
    this.write()
  }

  list() {
    if (this.state.tasks.length === 0) console.log("Good, you are done! There is no Task left.")
    else console.log(this.toString())
  }

  update(id: number, update: string): void {
    const task = this.get(id)
    if (task) {
      this.set(id, update)
    } else {
      console.log(`Task with id ${id} doesn't exist`)
    }
  }

  mark(id: number) {
    const task = this.get(id)
    if (!task) return

    this.update(id, strike(task))
  }

  unmark(id: number) {
    const task = this.get(id)
    if (!task) return

    this.update(id, unStrike(task))
  }

  delete(id: number) {
    this.state.tasks = this.state.tasks.filter((_, i) => this.index(id) != i)
    this.write()
  }

  index(id: number): number {
    return id - 1
  }

  size(): number {
    return this.state.tasks.length
  }

  private get(id: number): string | undefined {
    return this.state.tasks.at(this.index(id))
  }

  private set(id: number, value: string) {
    this.state.tasks[this.index(id)] = value
    this.write()
  }

  toString() {
    const header = "Tasks:"
    const body = this.state.tasks.map((task, i) => (i + 1) + "- " + task).join("\n")

    return `${header}
${body}`
  }

}

export default Taskler

function strike(text: string): string {
  return `\x1b[9m${text}\x1b[0m`
}

function unStrike(text: string): string {
  const strikeRegex = /\x1b\[9m|\x1b\[0m/g;
  return text.replace(strikeRegex, "")
}