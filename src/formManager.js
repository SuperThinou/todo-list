import { form } from "./dom";

export let isEditingTask = false;

function getTaskValues() {
  const h2 = document.getElementById("addNewTaskTitle");
  const title = form.elements["title"];
  const description = form.elements["description"];
  const dueDate = form.elements["dueDate"];
  const priority = form.elements["priority"];
  const addBtn = form.elements["addBtn"];

  return { h2, title, description, dueDate, priority, addBtn };
}

export function fillPopupWithTaskContent(id, todo) {
  const { h2, title, description, dueDate, priority, addBtn } = getTaskValues();

  h2.textContent = "Edit my task";
  title.value = todo.title;
  description.value = todo.description;
  dueDate.value = todo.dueDate;
  priority.value = todo.priority;
  addBtn.textContent = "Save changes";

  isEditingTask = true;
  return isEditingTask;
}

export function resetPopupContent() {
  const { h2, title, description, dueDate, priority, addBtn } = getTaskValues();

  h2.textContent = "New task";
  title.value = "";
  description.value = "";
  dueDate.value = "";
  priority.value = "";
  addBtn.textContent = "Add Task";

  isEditingTask = false;
  return isEditingTask;
}
