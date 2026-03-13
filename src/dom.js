// sidebar selectors
const allTaskBtn = document.getElementById("allTasksBtn");
const todayBtn = document.getElementById("todayBtn");
const thisWeekBtn = document.getElementById("thisWeekBtn");

// main selectors
const mainTitle = document.getElementById("mainTitle");
const newTaskBtn = document.getElementById("newTaskBtn");
const newTaskPopup = document.getElementById("newTaskPopup");
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
});

addBtn.addEventListener("click", () => {
  newTaskPopup.classList.add("hidden");
});
