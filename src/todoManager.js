import Todo from "./Todo";
import { projects, currentProject } from "./projectManager";
import { isToday, isThisWeek } from "date-fns";
import {
  deleteTodoStorage,
  saveTodoStorage,
  updateTodoStorage,
  updateProjectStorage,
} from "./storage";

export let todos = [];

export function addTodo(todoData) {
  const todo = new Todo(todoData);
  if (!currentProject) {
    todos.push(todo);

    saveTodoStorage(todo);
  }

  return todo;
}

export function modifyTodo(id, todoData) {
  let todo;

  if (currentProject) {
    const project = projects.find(
      (project) => project.id === currentProject.id,
    );

    todo = project?.todos.find((todo) => todo.id === id);

    if (!todo) return null;

    Object.assign(todo, todoData);

    updateProjectStorage(project.id, {
      todos: project.todos,
    });
  } else {
    todo = todos.find((todo) => todo.id === id);

    if (!todo) return null;

    Object.assign(todo, todoData);
  }

  updateTodoStorage(id, todoData);

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

    updateProjectStorage(currentProject.id, {
      todos: currentProject.todos,
    });
  }

  const todoContainer = document.querySelector(
    `.todo-container[data-id="${id}"]`,
  );
  if (todoContainer) todoContainer.remove();

  deleteTodoStorage(id);
}
