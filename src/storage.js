function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      storage &&
      storage.length !== 0
    );
  }
}

const STORAGE_KEY = "todoAppData";

function getStorage() {
  if (!storageAvailable("localStorage")) return null;
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { projects: [], todos: [] };
}

function setStorage(data) {
  if (!storageAvailable("localStorage")) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// PROJECTS FUNCTIONS
export function getProjectsStorage() {
  return getStorage().projects;
}

export function saveProjectStorage(project) {
  const storage = getStorage();
  storage.projects.push(project);
  setStorage(storage);
}

export function updateProjectStorage(projectId, newData) {
  const storage = getStorage();
  storage.projects = storage.projects.map((p) =>
    p.id === projectId ? { ...p, ...newData } : p,
  );
  setStorage(storage);
}

export function deleteProjectStorage(projectId) {
  const storage = getStorage();
  storage.projects = storage.projects.filter((p) => p.id !== projectId);
  setStorage(storage);
}

// TODOS FUNCTIONS
export function getTodosStorage() {
  return getStorage().todos;
}

export function saveTodoStorage(todo) {
  const storage = getStorage();
  storage.todos.push(todo);
  setStorage(storage);
}

export function updateTodoStorage(todoId, newData) {
  const storage = getStorage();
  storage.todos = storage.todos.map((t) =>
    t.id === todoId ? { ...t, ...newData } : t,
  );
  setStorage(storage);
}

export function deleteTodoStorage(todoId) {
  const storage = getStorage();
  storage.todos = storage.todos.filter((t) => t.id !== todoId);
  setStorage(storage);
}

// CLear localStorage
export function clearAll() {
  if (!storageAvailable("localStorage")) return;
  localStorage.removeItem(STORAGE_KEY);
}
