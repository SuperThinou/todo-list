import {
  addTodo,
  getAllTodos,
  getTodosToday,
  getTodosThisWeek,
} from "./todoManager";

const page = document.getElementById("page");

// sidebar selectors
const allTaskBtn = document.getElementById("allTasksBtn");
const todayBtn = document.getElementById("todayBtn");
const thisWeekBtn = document.getElementById("thisWeekBtn");

// main selectors
const mainTitle = document.getElementById("mainTitle");
export const container = document.getElementById("allTodosContainer");
const newTaskBtn = document.getElementById("newTaskBtn");
const newTaskPopup = document.getElementById("newTaskPopup");
const form = document.getElementById("newTaskForm");
const addBtn = document.getElementById("addBtn");

// sidebar event listeners
allTaskBtn.addEventListener("click", () => {
  clearContainer(container);
  mainTitle.textContent = "All Tasks";
  getAllTodos().forEach((todo) => displayTodoDom(todo, container));
});

todayBtn.addEventListener("click", () => {
  clearContainer(container);
  mainTitle.textContent = "Today";
  getTodosToday().forEach((todo) => displayTodoDom(todo, container));
});

thisWeekBtn.addEventListener("click", () => {
  clearContainer(container);
  mainTitle.textContent = "This week";
  getTodosThisWeek().forEach((todo) => displayTodoDom(todo, container));
});

// main event listeners
newTaskBtn.addEventListener("click", () => {
  newTaskPopup.classList.remove("hidden");
  page.classList.add("blur");
});

addBtn.addEventListener("click", () => {
  if (form.checkValidity()) {
    newTaskPopup.classList.add("hidden");
    page.classList.remove("blur");
    const todo = addTodo(getFormValues());
    displayTodoDom(todo, container);
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

export function clearContainer(container) {
  container.innerHTML = "";
}
