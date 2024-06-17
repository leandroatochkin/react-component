import { useState } from 'react'
import NewProjectDialog from '../components/NewProjectDialog'
import { loadProjects } from '../utils/utils.js'
import AddIcon from '@mui/icons-material/Add';

import './App.css'
import Project from '../components/Project'

function App() {

  const [projects, setProjects] = useState(loadProjects())
  const [openNewProject, setOpenNewProject] = useState(false)
  console.log(projects)

  const handleNewProject = () =>{
    openNewProject === false ? setOpenNewProject(true) : setOpenNewProject(false)
  }

  return (
  <div className='main-display'>
    {openNewProject && <NewProjectDialog />}
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
