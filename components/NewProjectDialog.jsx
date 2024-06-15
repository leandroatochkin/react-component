import React from 'react'
import { useState, useEffect } from 'react'
import { addNewProject } from '../utils/utils.js'

const NewProjectDialog = () => {
   
    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [finishDate, setFinishDate] = useState('')
    const [importance, setImportance] = useState('')
    const [tasks, setTasks] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(true);

    const modal = document.querySelector('.modal')

    const handleClose = () =>{
        setIsModalOpen(false);
    }

    const handleTitle = (e) =>{
        setProjectName(e.target.value)
    }

    const handleDescription = (e) =>{
        setProjectDescription(e.target.value)
    }

    const handleFinishDate = (e) =>{
        setFinishDate(e.target.value)    
    }

    const handleImportance = (e) => {
        setImportance(e.target.value)
    }

    const handleTasks = () =>{
        const inputValue = document.querySelector('.dialogue-tasks-input')
        const task = inputValue.value
        setTasks((prevTasks) => [...prevTasks, {task, completed: false}]);
        inputValue.value = '';
    }

    const handleRemoveTasks = (taskToRemove) =>{
        setTasks((prevTasks) => prevTasks.filter((task) => task.task !== taskToRemove));
    }

    const handleAddProject = (e) =>{
        e.preventDefault()
        addNewProject(projectName, projectDescription, finishDate, importance, tasks)
        modal.remove(); 
    }

    if (!isModalOpen) {
        return null; // Return null to not render the modal if it's closed
    }

  return (
    <div className='modal'>
        <form className='dialogue-container'>
            <div className='close-form-button-container'>
                <button className='close-form-button' onClick={handleClose}>X</button>
            </div>
            <h3 className='dialogue-title'>Create new project</h3>
            <label htmlFor='name'>Name: </label>
            <input name='name' type='text' required={true} placeholder='Project name' className='dialogue-title-input' onChange={handleTitle}></input>
            <label htmlFor='description'>Description: </label>
            <input name='description' type='text' required={true} placeholder='Project description' className='dialogue-title-input' onChange={handleDescription}></input>
            <label htmlFor='date'>Finish Date: </label>
            <input name='date' type='date' required={true} className='dialogue-date-input' onChange={handleFinishDate}></input>
            <label htmlFor='importance'>Importance: </label>
            <select name='importance' required={true} className='dialogue-importance-input' onChange={handleImportance}>
            <option value='high'>High</option>
            <option value='medium'>Medium</option>
            <option value='low'>Low</option>
            </select>
            <label htmlFor='tasks'>Tasks: </label>
            <div className='tasks-input-container'>
            <input name='tasks' type='text' required={true} placeholder='Enter task' className='dialogue-tasks-input'></input>
            <button className='dialogue-add-task-button' onClick={handleTasks}>Add task</button>
            </div>
            <ul className='dialogue-tasks-list'>
                {tasks.map((task, index) => (
                    <li key={index} id={task.task}>{task.task} <button className='dialogue-remove-task-button' onClick={()=>handleRemoveTasks(task.task)}>x</button></li>
                    ))}
            </ul>
            <button type='submit' className='dialogue-add-project' onClick={handleAddProject}>Add Project</button>
        </form>
    </div>
  )
}

export default NewProjectDialog