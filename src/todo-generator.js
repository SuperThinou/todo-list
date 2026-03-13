class Todo {
  constructor({ title, description, dueDate, priority }) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = false;
  }
}

const todo1 = new Todo({
  title: "Coder la todo list",
  description: "Projet JS",
  dueDate: "2026-03-15",
  priority: "high",
});

console.log(todo1);
