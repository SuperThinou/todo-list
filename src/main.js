import "./style.css";
import Todo from "./Todo";
import Project from "./Project";
import { displayTodoDom, clearContainer, addBtn } from "./dom";
import {
  addTodo,
  getAllTodos,
  getTodosToday,
  getTodosThisWeek,
} from "./todoManager";

const container = document.getElementById("allTodosContainer");

// Default todo and project
const defaultTodo = new Todo({
  title: "Default task",
  description: "My description",
  dueDate: "2026-03-15",
  priority: "Medium",
});
const defaultProject = new Project("Default project");
defaultProject.addTodo({
  title: "My task in a project",
  description: "A little description",
  dueDate: "2026-03-20",
  priority: "high",
});

displayTodoDom(defaultTodo, container);

// Event listeners
addBtn.addEventListener("click", () => {
  if (form.checkValidity()) {
    const todo = new Todo(getFormValues());
    displayTodoDom(todo, container);
  }
});
