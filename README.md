# Tasker

Tasker is a simple command-line interface (CLI) application designed to help you track and manage your tasks. With Tasker, you can easily add, update, delete tasks, and keep track of what you need to do, what you're currently working on, and what you’ve completed.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Add a Task](#add-a-task)
  - [Update a Task](#update-a-task)
  - [Delete a Task](#delete-a-task)
  - [Mark a Task as Done](#mark-a-task-as-done)
  - [Unmark a Task](#unmark-a-task)
  - [List Tasks](#list-tasks)
- [Error Handling](#error-handling)

## Features

- Add Tasks: Create new tasks with a description.
- Update Tasks: Modify existing tasks.
- Delete Tasks: Remove tasks you no longer need.
- Mark Tasks: Indicate whether a task is in progress or completed.
- List Tasks: View all tasks, or filter by status (all, done, not done, in progress).

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/your-username/tasker.git
cd tasker
```

## Usage

Run the application from the command line. The following commands are available:

### Add a Task:

```bash
  pnpm tasker add "Your task description"
```

### Update a Task:

```bash
  pnpm tasker update "Updated task description" <task_id>
```

### Delete a Task:

```bash
  pnpm tasker delete <task_id>
```

### Mark a Task as Done:

```bash
  pnpm tasker done <task_id>
```

### Unmark a Task:

```bash
  pnpm tasker undone <task_id>
```

### List Tasks:

```bash
  pnpm tasker list
```

## Error Handling

Tasker handles various edge cases, such as attempting to update or delete a non-existent task, providing invalid inputs, or trying to perform actions on an empty task list. All errors are reported clearly in the command line.
