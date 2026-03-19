import Project from "./Project";

export const projects = [];
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
