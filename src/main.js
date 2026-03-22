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
import {
  getProjectsStorage,
  getTodosStorage,
  saveProjectStorage,
  saveTodoStorage,
  clearAll,
} from "./storage";

// Default todo and project
document.addEventListener("DOMContentLoaded", () => {
  const storedTodos = getTodosStorage();
  const storedProjects = getProjectsStorage();

  if (storedTodos.length === 0 && storedProjects.length === 0) {
    const defaultTodo = new Todo({
      title: "Default task",
      description: "My default task description",
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
    projects.push(defaultProject);

    saveTodoStorage(defaultTodo);
    saveProjectStorage(defaultProject);
  } else {
    todos.push(...storedTodos);
    projects.push(
      ...storedProjects.map((p) => {
        const project = new Project(p.title);
        project.id = p.id;

        project.todos = (p.todos || []).map((t) => new Todo(t));

        return project;
      }),
    );
  }

  todos.forEach((todo) => displayTodoDom(todo, allTodosContainer));
  projects.forEach((project) =>
    displayProjectDom(project, allProjectsContainer),
  );
});
