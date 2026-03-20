import Project from "./Project";

export let projects = [];
export let currentProject = null;

export function createProject(title) {
  const project = new Project(title);
  projects.push(project);
  return project;
}

export function setCurrentProject(projectId) {
  currentProject = projects.find((p) => p.id === projectId);
  return currentProject;
}

export function addTodoToCurrentProject(todo) {
  if (currentProject) {
    currentProject.addTodo(todo);
  }
}
export function clearCurrentProject() {
  currentProject = null;
}

export function deleteProject(projectId) {
  const project = projects.find((p) => p.id === projectId);

  if (project.todos.length > 0) {
    const confirmDelete = confirm(
      "This will also delete all your tasks inside this project. Continue?",
    );

    if (!confirmDelete) return false;
  }

  projects = projects.filter((project) => project.id !== projectId);
  return true;
}
