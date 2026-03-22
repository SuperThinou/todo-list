import Todo from "./Todo";
import { currentProject } from "./projectManager";
import { isToday, isThisWeek } from "date-fns";

export let todos = [];

export function addTodo(todoData) {
  const todo = new Todo(todoData);
  if (!currentProject) {
    todos.push(todo);
  }
  return todo;
}

export function modifyTodo(id, todoData) {
  const todo = todos.find((todo) => todo.id === id);

  Object.assign(todo, todoData);

  return todo;
}

export function getAllTodos() {
  return todos;
}

export function getTodosToday() {
  return todos.filter((todo) => isToday(new Date(todo.dueDate)));
}

export function getTodosThisWeek() {
  return todos.filter((todo) => isThisWeek(new Date(todo.dueDate)));
}

export function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);

  if (currentProject) {
    currentProject.todos = currentProject.todos.filter(
      (todo) => todo.id !== id,
    );
  }
}
