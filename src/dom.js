// sidebar selectors
const allTaskBtn = document.getElementById("allTasksBtn");
const todayBtn = document.getElementById("todayBtn");
const thisWeekBtn = document.getElementById("thisWeekBtn");

// main selectors
const mainTitle = document.getElementById("mainTitle");

allTaskBtn.addEventListener("click", () => {
  mainTitle.textContent = "All Tasks";
});

todayBtn.addEventListener("click", () => {
  mainTitle.textContent = "Today";
});

thisWeekBtn.addEventListener("click", () => {
  mainTitle.textContent = "This week";
});
