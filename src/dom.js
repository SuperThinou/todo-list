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
  modifyTodo,
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

import {
  fillPopupWithTaskContent,
  isEditingTask,
  resetPopupContent,
} from "./formManager.js";

import { format, isToday, isTomorrow, isYesterday, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

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
export const newTaskBtn = document.getElementById("newTaskBtn");
export const TaskPopup = document.getElementById("TaskPopup");
export const form = document.getElementById("TaskForm");
const addBtn = document.getElementById("addBtn");

let editingTodoId = null;

// SIDEBAR EVENT LISTENERS
// Tasks event listeners (All, Today, This Week)
allTaskBtn.addEventListener("click", () => {
  refreshMain("All Tasks", getAllTodos);
});

todayBtn.addEventListener("click", () => {
  refreshMain("Today", getTodosToday);
});

thisWeekBtn.addEventListener("click", () => {
  refreshMain("This week", getTodosThisWeek);
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
  const deleteBtn = e.target.closest(".delete-project-btn");
  const projectBtn = e.target.closest(".project-btn");

  if (deleteBtn && projectBtn) {
    const projectId = projectBtn.dataset.id;

    const isDeleted = deleteProject(projectId);

    if (isDeleted) {
      projectBtn.remove();
      clearContainer(allTodosContainer);
      refreshMain("All Tasks", getAllTodos);
    }

    return;
  }

  const button = e.target.closest(".project-btn");
  if (!button) return;

  const projectId = button.dataset.id;
  const project = setCurrentProject(projectId);

  clearContainer(allTodosContainer);
  displayTodosInProjectDom(project, allTodosContainer);

  mainTitle.textContent = "Project: " + project.title;
  newTaskBtn.textContent = "New Task in " + project.title;
});

// MAIN EVENT LISTENERS
// New task btn, popup form and task btns
newTaskBtn.addEventListener("click", () => {
  resetPopupContent();
  TaskPopup.classList.remove("hidden");
  page.classList.add("blur");
});

TaskPopup.addEventListener("click", (e) => {
  TaskPopup.classList.add("hidden");
  page.classList.remove("blur");
});
form.addEventListener("click", (e) => {
  e.stopPropagation();
});

addBtn.addEventListener("click", () => {
  if (form.checkValidity()) {
    TaskPopup.classList.add("hidden");
    page.classList.remove("blur");

    if (isEditingTask) {
      modifyTodo(editingTodoId, getFormValues());
      modifyTodoDom(editingTodoId);
      editingTodoId = null;
    } else {
      const todo = addTodo(getFormValues());
      addTodoToCurrentProject(todo);
      displayTodoDom(todo, allTodosContainer);
    }
  } else alert("Required fields can't be empty");
});

allTodosContainer.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-task-btn");
  const editBtn = e.target.closest(".edit-task-btn");

  console.log(deleteBtn, editBtn);

  // DELETE
  if (deleteBtn) {
    const id = deleteBtn.dataset.id;

    deleteTodo(id);

    return;
  }

  // EDIT
  if (editBtn) {
    TaskPopup.classList.remove("hidden");
    page.classList.add("blur");

    const id = editBtn.dataset.id;
    let todo = null;
    editingTodoId = id;
    console.log(currentProject);

    if (currentProject) {
      const project = projects.find((p) => p.id === currentProject.id);
      todo = project.todos.find((todo) => todo.id === id);
    } else {
      todo = todos.find((todo) => todo.id === id);
    }

    fillPopupWithTaskContent(id, todo);
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
  todoContainer.dataset.id = todo.id;

  const title = document.createElement("h3");
  const description = document.createElement("p");
  const dueDate = document.createElement("p");
  const priority = document.createElement("p");
  const taskBtnContainer = document.createElement("div");
  const editTaskBtn = document.createElement("button");
  const deleteTaskBtn = document.createElement("button");

  title.classList.add("todo-title");
  description.classList.add("todo-description");
  dueDate.classList.add("todo-duedate");
  priority.classList.add("todo-priority");

  title.textContent = todo.title;
  description.textContent = todo.description;
  dueDate.textContent = "Deadline: " + formatDate(todo.dueDate);
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
  project.todos.forEach((todo) => {
    displayTodoDom(todo, container);
  });
}

function clearContainer(container) {
  container.innerHTML = "";
}

function refreshMain(title, getTodosFn) {
  clearCurrentProject();
  clearContainer(allTodosContainer);

  mainTitle.textContent = title;
  if (title !== "All Tasks") newTaskBtn.textContent = "New Task " + title;
  else newTaskBtn.textContent = "New Task ";

  getTodosFn().forEach((todo) => displayTodoDom(todo, allTodosContainer));
}

function modifyTodoDom(id) {
  const todoContainer = document.querySelector(`[data-id="${id}"]`);
  if (!todoContainer) return;

  const todoList = currentProject ? currentProject.todos : todos;
  const todo = todoList.find((t) => t.id === id);
  if (!todo) return;

  if (!todoContainer) return;

  todoContainer.querySelector(".todo-title").textContent = todo.title;
  todoContainer.querySelector(".todo-description").textContent =
    todo.description;
  todoContainer.querySelector(".todo-duedate").textContent =
    "Deadline: " + formatDate(todo.dueDate);
  todoContainer.querySelector(".todo-priority").textContent =
    "Priority: " + todo.priority;
}

function formatDate(dateString) {
  const date = parseISO(dateString);

  if (isToday(date)) return "Aujourd’hui";
  if (isTomorrow(date)) return "Demain";
  if (isYesterday(date)) return "Hier";

  return format(date, "d MMMM yyyy", { locale: fr });
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
