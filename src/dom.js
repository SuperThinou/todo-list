// I really need to refactor the code and separate the logic and dom manipulation..

import {
  todos,
  addTodo,
  getAllTodos,
  getTodosToday,
  getTodosThisWeek,
} from "./todoManager";

import {
  projects,
  createProject,
  setCurrentProject,
  addTodoToCurrentProject,
  clearCurrentProject,
} from "./projectManager.js";

const page = document.getElementById("page");

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

// Projects event listeners (add btn, form and project selector)
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
  clearContainer(allTodosContainer);
  const button = e.target.closest("button");
  if (!button) return;

  const projectId = button.dataset.id;
  const project = setCurrentProject(projectId);

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
    console.log(projects, todos);
  } else alert("Required fields can't be empty");
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

  title.textContent = todo.title;
  description.textContent = todo.description;
  dueDate.textContent = todo.dueDate;
  priority.textContent = "Priority: " + todo.priority;

  todoContainer.append(title, description, dueDate, priority);
  container.append(todoContainer);
}

export function displayProjectDom(project, container) {
  const projectBtn = document.createElement("button");
  projectBtn.classList.add("project-btn");
  projectBtn.dataset.id = project.id;

  projectBtn.textContent = project.title;

  container.append(projectBtn);
}

export function displayTodosInProjectDom(project, container) {
  project.todos.forEach((todo) => {
    displayTodoDom(todo, container);
  });
}

export function clearContainer(container) {
  container.innerHTML = "";
}
