import assert from "node:assert"
import { after, describe, test } from "node:test"
import taskHandler from '../src/taskHandler'
import * as fs from 'fs'

describe("Task Handler tests", () => {
  const testPath = './task.test.json'
  const tasker = new taskHandler({ path: testPath })

  after(() => {
    console.log('Deleting test tasks')
    try {
      fs.unlinkSync(testPath)
      console.log('Done')
    } catch (error) {
      console.error('Error deleting test tasks', error)
    }
  })

  test("Add", () => {
    const testTask = "Dummy Task"
    tasker.add(testTask)

    assert.equal(
      JSON.stringify(tasker.state.tasks),
      JSON.stringify(["Dummy Task"]))
  })

  test("Update", () => {
    const testUpdate = "Updated Task"
    const id = 1
    tasker.update(id, testUpdate)

    assert.equal(
      JSON.stringify(tasker.state.tasks),
      JSON.stringify(["Updated Task"]))
  })

  test("Delete", () => {
    const id = 1
    tasker.delete(id)

    assert.equal(
      tasker.state.tasks.length,
      0
    )
  })

  test("List", () => {
    const pattern = `Tasks:
1- Task
2- Task
3- Task`

    Array(3).fill(0).forEach(() => tasker.add("Task"))
    assert.equal(tasker.toString(), pattern)
  })
})
