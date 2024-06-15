import React from 'react'
import { useState, useEffect } from 'react';
import { saveProjects } from '../utils/utils.js';



const Project = ({projects}) => {

const [projectsArr, setProjectsArr] = useState([])



useEffect(() => {
    if (projects && projects.length > 0) {
        setProjectsArr(projects);
    }
}, [projects]);

console.log(projectsArr)

const handleCompleteProject = () => {
    const index = projectsArr.indexOf(project);
    if (index > -1) {
        projects.splice(index, 1);
        saveProjects(projectsArr);
    }
}
  return (
    <>
    {projectsArr.map((project, index)=>{
        return (    
            <div className='project-bubble' key={index}>
        <div className='project-title-container'>
            <h3>{project.name}</h3>
            <button className='complete-project-button' onClick={handleCompleteProject}>Complete Project</button>
        </div>
        <h3 className='project-bubble-date'>Due: {project.finishDate}</h3>
        <p>{project.importance}</p>
        <div className='tasks-container'>
            {project.tasks.map((task, index)=>{
             return(
                    <div key={index} className='task-bubble'>{task.task}</div>
                )
            })}
        </div>
    </div>
        )
    })}
    </>
    
  )
}

export default Project