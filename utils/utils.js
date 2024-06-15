class Project {
  constructor(name, description, finishDate, importance, tasks) {
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
export const addNewProject = (name, description, finishDate, importance, tasks) => {
  const projects = loadProjects(); 
  projects.push(new Project(name, description, finishDate, importance, tasks)); 
  saveProjects(projects); 
  console.log('Project added:', projects); 
};

