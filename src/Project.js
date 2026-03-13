import Todo from "./Todo";

export default class Project {
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
