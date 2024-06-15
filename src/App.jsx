import { useState } from 'react'
import NewProjectDialog from '../components/NewProjectDialog'
import { loadProjects } from '../utils/utils.js'

import './App.css'
import Project from '../components/Project'

function App() {

  const [projects, setProjects] = useState(loadProjects())
  console.log(projects)
  return (
    <>
      <NewProjectDialog />
      <Project projects={projects} />
    </>
  )
}

export default App
