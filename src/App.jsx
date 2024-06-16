import { useState } from 'react'
import NewProjectDialog from '../components/NewProjectDialog'
import { loadProjects } from '../utils/utils.js'

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
    <>
      <div className='display'>
      <div className='main-section'>
      <Project projects={projects} />
      </div>
      <div className='sidebar'>
        <button className='new-project-button' onClick={handleNewProject}>
        add project
        </button>
      </div>
      {openNewProject && <NewProjectDialog />}
      </div> 
    </>
  )
}

export default App
