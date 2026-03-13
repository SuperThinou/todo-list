import "./style.css";
import Todo from "./Todo";
import Project from "./Project";
import "./dom";

// Default todo and project
const defaultTodo = new Todo({
  title: "My task",
  description: "My description",
  dueDate: "2026-03-15",
  priority: "medium",
});

const defaultProject = new Project("Default project");

defaultProject.addTodo({
  title: "My task in a project",
  description: "A little description",
  dueDate: "2026-03-20",
  priority: "high",
});

console.log(defaultTodo, defaultProject);
