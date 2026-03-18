import Todo from "./Todo";
import { isToday, isThisWeek } from "date-fns";

const todos = [];

export function addTodo(todoData) {
  const todo = new Todo(todoData);
  todos.push(todo);
  return todo;
}

export function getAllTodos() {
  return todos;
}

export function getTodosToday() {
  return todos.filter(todo => isToday(new Date(todo.dueDate)));
}

export function getTodosThisWeek() {
  return todos.filter(todo => isThisWeek(new Date(todo.dueDate)));
}