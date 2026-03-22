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
import { projects } from "./projectManager";

// Default todo and project
const defaultTodo = new Todo({
  title: "Default task",
  description: "My default task description ",
  dueDate: "2026-03-15",
  priority: "Medium",
});
const defaultProject = new Project("Default project");
defaultProject.addTodo({
  title: "My task in a project",
  description: "A little description",
  dueDate: "2026-03-20",
  priority: "High",
});

todos.push(defaultTodo);
displayTodoDom(defaultTodo, allTodosContainer);
projects.push(defaultProject);
displayProjectDom(defaultProject, allProjectsContainer);

//Faire feature pour gérer save en local storage
