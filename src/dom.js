import editIcon from "./icons/edit.svg";
import closeIcon from "./icons/close.svg";
import githubIcon from "./icons/github-mark-grey.svg";

import {
  todos,
  addTodo,
  getAllTodos,
  getTodosToday,
  getTodosThisWeek,
  deleteTodo,
} from "./todoManager";

import {
  projects,
  createProject,
  currentProject,
  setCurrentProject,
  addTodoToCurrentProject,
  clearCurrentProject,
  deleteProject,
} from "./projectManager.js";

const root = document.documentElement;
const page = document.getElementById("page");
const darkModeBtn = document.getElementById("darkModeBtn");

// SIDEBAR SELECTORS
const allTaskBtn = document.getElementById("allTasksBtn");
const todayBtn = document.getElementById("todayBtn");
const thisWeekBtn = document.getElementById("thisWeekBtn");
const newProjectBtn = document.getElementById("newProjectBtn");
const newProjectForm = document.getElementById("newProjectForm");
const addProjectBtn = document.getElementById("addProjectBtn");
const cancelProjectBtn = document.getElementById("cancelProjectBtn");
export const allProjectsContainer = document.getElementById(
  "allProjectsContainer",
);

// MAIN SELECTORS
const mainTitle = document.getElementById("mainTitle");
export const allTodosContainer = document.getElementById("allTodosContainer");
export const allTodosInProjectContainer = document.getElementById(
  "allTodosInProjectContainer",
);
const newTaskBtn = document.getElementById("newTaskBtn");
const newTaskPopup = document.getElementById("newTaskPopup");
const form = document.getElementById("newTaskForm");
const addBtn = document.getElementById("addBtn");

// SIDEBAR EVENT LISTENERS
// Tasks event listeners (All, Today, This Week)
allTaskBtn.addEventListener("click", () => {
  clearCurrentProject();
  clearContainer(allTodosContainer);
  mainTitle.textContent = "All Tasks";
  newTaskBtn.textContent = "New Task";
  getAllTodos().forEach((todo) => displayTodoDom(todo, allTodosContainer));
});

todayBtn.addEventListener("click", () => {
  clearCurrentProject();
  clearContainer(allTodosContainer);
  mainTitle.textContent = "Today";
  newTaskBtn.textContent = "New Task";
  getTodosToday().forEach((todo) => displayTodoDom(todo, allTodosContainer));
});

thisWeekBtn.addEventListener("click", () => {
  clearCurrentProject();
  clearContainer(allTodosContainer);
  mainTitle.textContent = "This week";
  newTaskBtn.textContent = "New Task";
  getTodosThisWeek().forEach((todo) => displayTodoDom(todo, allTodosContainer));
});

// Projects event listeners (add btn, form, project selector and delete)
newProjectBtn.addEventListener("click", () => {
  newProjectForm.classList.remove("hidden");
});

addProjectBtn.addEventListener("click", () => {
  const projectName = document.getElementById("projectName").value;
  if (projectName === "") return;
  const project = createProject(projectName);
  displayProjectDom(project, allProjectsContainer);

  newProjectForm.classList.add("hidden");
});

cancelProjectBtn.addEventListener("click", () => {
  newProjectForm.classList.add("hidden");
});

allProjectsContainer.addEventListener("click", (e) => {
  const projectId = e.target.dataset.id;

  if (e.target.classList.contains("delete-project-btn")) {
    const projectBtn = e.target.closest(".project-btn");
    const isDeleted = deleteProject(projectId);

    if (isDeleted) {
      projectBtn.remove();
      clearContainer(allTodosContainer);
    }

    return;
  }

  const button = e.target.closest("button");
  if (!button) return;

  const project = setCurrentProject(projectId);

  clearContainer(allTodosContainer);
  displayTodosInProjectDom(project, allTodosContainer);
  mainTitle.textContent = "Project: " + project.title;
  newTaskBtn.textContent = "New Task in " + project.title;
});

// MAIN EVENT LISTENERS
// New task btn and popup form
newTaskBtn.addEventListener("click", () => {
  newTaskPopup.classList.remove("hidden");
  page.classList.add("blur");
});

newTaskPopup.addEventListener("click", (e) => {
  newTaskPopup.classList.add("hidden");
  page.classList.remove("blur");
});
form.addEventListener("click", (e) => {
  e.stopPropagation();
});

addBtn.addEventListener("click", () => {
  if (form.checkValidity()) {
    newTaskPopup.classList.add("hidden");
    page.classList.remove("blur");

    const todo = addTodo(getFormValues());
    addTodoToCurrentProject(todo);
    displayTodoDom(todo, allTodosContainer);
  } else alert("Required fields can't be empty");
});

allTodosContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-task-btn")) {
    const id = e.target.dataset.id;

    deleteTodo(id);

    clearContainer(allTodosContainer);

    if (currentProject) {
      const project = projects.find((p) => p.id === currentProject.id);
      project.todos.forEach((todo) => {
        displayTodoDom(todo, allTodosContainer);
      });
    } else
      todos.forEach((todo) => {
        displayTodoDom(todo, allTodosContainer);
      });
  }
});

// FUNCTIONS

export function getFormValues() {
  const title = form.querySelector("#title").value;
  const description = form.querySelector("#description").value;
  const dueDate = form.querySelector("#dueDate").value;
  const priority = form.querySelector('input[name="priority"]:checked')?.value;

  return { title, description, dueDate, priority };
}

export function displayTodoDom(todo, container) {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");

  const title = document.createElement("h3");
  const description = document.createElement("p");
  const dueDate = document.createElement("p");
  const priority = document.createElement("p");
  const taskBtnContainer = document.createElement("div");
  const editTaskBtn = document.createElement("button");
  const deleteTaskBtn = document.createElement("button");

  title.textContent = todo.title;
  description.textContent = todo.description;
  dueDate.textContent = todo.dueDate;
  priority.textContent = "Priority: " + todo.priority;

  taskBtnContainer.classList.add("task-btn-container");

  editTaskBtn.innerHTML = editIcon;
  editTaskBtn.classList.add("edit-task-btn");
  editTaskBtn.dataset.id = todo.id;

  deleteTaskBtn.innerHTML = closeIcon;
  deleteTaskBtn.classList.add("delete-task-btn");
  deleteTaskBtn.dataset.id = todo.id;

  taskBtnContainer.append(editTaskBtn, deleteTaskBtn);
  todoContainer.append(title, description, dueDate, priority, taskBtnContainer);
  container.append(todoContainer);

  return deleteTaskBtn;
}

export function displayProjectDom(project, container) {
  const projectBtn = document.createElement("button");
  const deleteProjectBtn = document.createElement("button");

  projectBtn.classList.add("project-btn");
  projectBtn.dataset.id = project.id;

  deleteProjectBtn.classList.add("delete-project-btn");
  deleteProjectBtn.dataset.id = project.id;

  projectBtn.textContent = project.title;
  deleteProjectBtn.innerHTML = closeIcon;

  projectBtn.append(deleteProjectBtn);
  container.append(projectBtn);

  return deleteProjectBtn;
}

export function displayTodosInProjectDom(project, container) {
  if (project.todos > 0) {
    project.todos.forEach((todo) => {
      displayTodoDom(todo, container);
    });
  }
}

export function clearContainer(container) {
  container.innerHTML = "";
}

// Theme switcher
darkModeBtn.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");

  if (currentTheme === "dark") {
    root.setAttribute("data-theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
  }
});

// Footer logo
const link = document.querySelector(".github-link");
link.innerHTML = githubIcon;
const ghLogoSvg = link.querySelector("svg");
ghLogoSvg.classList.add("github-logo");
