class Todo {
  constructor({ title, description, dueDate, priority }) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = false;
  }
}

class Project {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }
  addTodo(todoData) {
    const todo = new Todo(todoData);
    this.todos.push(todo);
  }
}

const todo1 = new Todo({
  title: "Coder la todo list",
  description: "Projet JS",
  dueDate: "2026-03-15",
  priority: "high",
});

const project = new Project("Travail");

project.addTodo({
  title: "Coder",
  description: "Todo app",
  dueDate: "2026-03-20",
  priority: "high",
});

console.log(todo1, project);
