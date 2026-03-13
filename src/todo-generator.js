// Project and todo generation
class Todo {
  constructor({ title, description, dueDate, priority }) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = false;
  }
}

class Project {
  constructor(title) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.todos = [];
  }
  addTodo(todoData) {
    const todo = new Todo(todoData);
    this.todos.push(todo);
  }
}

// Default todo and project
const defaultTodo = new Todo({
  title: "My task",
  description: "My description",
  dueDate: "2026-03-15",
  priority: "medium",
});

const defaultProject = new Project("Default project");

defaultProject.addTodo({
  title: "My task in a project",
  description: "A little description",
  dueDate: "2026-03-20",
  priority: "high",
});

console.log(defaultTodo, defaultProject);
