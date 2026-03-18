import "./style.css";
import Todo from "./Todo";
import Project from "./Project";
import {
  displayTodoDom,
  allTodosContainer,
  allProjectsContainer,
  displayProjectDom,
} from "./dom";
import { todos } from "./todoManager";

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

todos.push(defaultTodo);
displayTodoDom(defaultTodo, allTodosContainer);
displayProjectDom(defaultProject, allProjectsContainer);
