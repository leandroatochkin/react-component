import { useState, useEffect } from 'react'
import NewProjectDialog from '../components/NewProjectDialog'
import { loadProjects, addNewProject } from '../utils/utils.js'
import AddIcon from '@mui/icons-material/Add';

import './App.css'
import Project from '../components/Project'

function App() {

  const [projects, setProjects] = useState(loadProjects())
  const [openNewProject, setOpenNewProject] = useState(false)
  console.log(projects)

  useEffect(() => {
    const loadedProjects = loadProjects();
    if (loadedProjects) {
      setProjects(loadedProjects);
    }
  }, []);

  const handleNewProject = () =>{
    openNewProject === false ? setOpenNewProject(true) : setOpenNewProject(false)
  }

  const handleAddNewProject = (id, name, description, finishDate, importance, tasks) => {
    addNewProject(id, name, description, finishDate, importance, tasks);
    const updatedProjects = loadProjects();
    setProjects(updatedProjects);
  };
 
  return (    
  <div className='main-display'>
    {openNewProject && <NewProjectDialog addNewProject={handleAddNewProject}/>}
    <div className='header'>PROJECT MANAGER</div>
      <div className='display'>
      <div className='main-section'>
      <Project projects={projects} />
      </div>
      <div className='sidebar'>
        <button className='new-project-button' onClick={handleNewProject}>
        {<AddIcon style={{fontSize: '96px'}}/>}
        </button>
      </div>
      </div> 
  </div>
  )
}

export default App
