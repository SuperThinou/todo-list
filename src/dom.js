import {
  addTodo,
  getAllTodos,
  getTodosToday,
  getTodosThisWeek,
} from "./todoManager";
import Project from "./Project";

const page = document.getElementById("page");

// sidebar selectors
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

// main selectors
const mainTitle = document.getElementById("mainTitle");
export const allTodosContainer = document.getElementById("allTodosContainer");
const newTaskBtn = document.getElementById("newTaskBtn");
const newTaskPopup = document.getElementById("newTaskPopup");
const form = document.getElementById("newTaskForm");
const addBtn = document.getElementById("addBtn");

// sidebar event listeners
allTaskBtn.addEventListener("click", () => {
  clearContainer(allTodosContainer);
  mainTitle.textContent = "All Tasks";
  getAllTodos().forEach((todo) => displayTodoDom(todo, allTodosContainer));
});

todayBtn.addEventListener("click", () => {
  clearContainer(allTodosContainer);
  mainTitle.textContent = "Today";
  getTodosToday().forEach((todo) => displayTodoDom(todo, allTodosContainer));
});

thisWeekBtn.addEventListener("click", () => {
  clearContainer(allTodosContainer);
  mainTitle.textContent = "This week";
  getTodosThisWeek().forEach((todo) => displayTodoDom(todo, allTodosContainer));
});

newProjectBtn.addEventListener("click", () => {
  newProjectForm.classList.remove("hidden");
});

addProjectBtn.addEventListener("click", () => {
  const project = new Project();
});

cancelProjectBtn.addEventListener("click", () => {
  newProjectForm.classList.add("hidden");
});

// main event listeners
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
    displayTodoDom(todo, allTodosContainer);
  } else alert("Required fields can't be empty");
});

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
  const projectBtn = document.createElement("h4");
  projectBtn.classList.add("project-btn");

  projectBtn.textContent = project.title;

  container.append(projectBtn);
}

export function clearContainer(container) {
  container.innerHTML = "";
}
