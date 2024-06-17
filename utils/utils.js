class Project {
  constructor(id, name, description, finishDate, importance, tasks) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.finishDate = finishDate;
    this.importance = importance;
    this.tasks = tasks;
  }
}

export const loadProjects = () => {
  const storedProjects = localStorage.getItem('projects');
  const parsedProjects = storedProjects ? JSON.parse(storedProjects) : [];
  if (!Array.isArray(parsedProjects)) {
    console.error('Loaded projects is not an array:', parsedProjects);
    return [];
  }
  return parsedProjects;
};


export const saveProjects = (projects) => {
  if (!Array.isArray(projects)) {
    console.error('Saving projects that is not an array:', projects);
    return;
  }
  localStorage.setItem('projects', JSON.stringify(projects));
};

// Add a new project
export const addNewProject = (id, name, description, finishDate, importance, tasks) => {
  const projects = loadProjects();
  const newProject = {
    id,
    name,
    description,
    finishDate,
    importance,
    tasks
  };
  projects.push(newProject);
  saveProjects(projects);
};

