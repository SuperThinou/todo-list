import Todo from "./Todo";

const page = document.getElementById("page");

// sidebar selectors
const allTaskBtn = document.getElementById("allTasksBtn");
const todayBtn = document.getElementById("todayBtn");
const thisWeekBtn = document.getElementById("thisWeekBtn");

// main selectors
const mainTitle = document.getElementById("mainTitle");
const todosContainer = document.getElementById("todosContainer");
const newTaskBtn = document.getElementById("newTaskBtn");
const newTaskPopup = document.getElementById("newTaskPopup");
const form = document.getElementById("newTaskForm");
const addBtn = document.getElementById("addBtn");

// sidebar event listeners
allTaskBtn.addEventListener("click", () => {
  mainTitle.textContent = "All Tasks";
});

todayBtn.addEventListener("click", () => {
  mainTitle.textContent = "Today";
});

thisWeekBtn.addEventListener("click", () => {
  mainTitle.textContent = "This week";
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
    const todo = new Todo(getFormValues());
    displayTodoDom(todo);
  } else alert("Required fields can't be empty");
});

export function getFormValues() {
  const title = form.querySelector("#title").value;
  const description = form.querySelector("#description").value;
  const dueDate = "2027-03-15";
  const priority = form.querySelector('input[name="priority"]:checked')?.value;

  return { title, description, dueDate, priority };
}

function displayTodoDom(todo) {
  const title = document.createElement("h3");
  const description = document.createElement("p");
  const priority = document.createElement("p");

  title.textContent = todo.title;
  description.textContent = todo.description;
  priority.textContent = todo.priority;

  todosContainer.append(title, description, priority);
}
