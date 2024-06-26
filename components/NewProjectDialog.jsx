import React from 'react'
import { useState, useEffect } from 'react'
import { addNewProject } from '../utils/utils.js'
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { v4 as uuidv4 } from 'uuid';
import Backdrop from './Backdrop.jsx';
import { motion } from 'framer-motion';
import { duration } from '@mui/material';

const NewProjectDialog = ({addNewProject}) => {

    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [finishDate, setFinishDate] = useState('')
    const [importance, setImportance] = useState('high')
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
        addNewProject(uuidv4(), projectName, projectDescription, finishDate, importance, tasks)
        setIsModalOpen(false)
    }

    if (!isModalOpen) {
        return null; // Return null to not render the modal if it's closed
    }

    const dropIn = {
        hidden: {
            y: '-100vh',
            opacity: 0
        },
        visible: {
            y: '0',
            opacity: 1,
            trasition: {
                duration: 0.1,
                type: 'spring',
                damping: 25,
                stifness: 500
            }

        },
        exit: {
            y: '100vh',
            opacity: 0
        }
    }

  return (
    <Backdrop>
        <motion.form 
        className='dialogue-container'
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
        >
            <div className='close-form-button-container'>
                <h3 className='dialogue-title'>Create new project</h3>
                <button className='close-form-button' onClick={handleClose}><CloseIcon />   </button>
            </div> 
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
            <button className='dialogue-add-task-button' onClick={handleTasks}>Add task {<AddCircleOutlineIcon />}</button>
            </div>
            <ul className='dialogue-tasks-list'>
                {tasks.map((task, index) => (
                    <li key={index} id={task.task}>{task.task} <button className='dialogue-remove-task-button' onClick={()=>handleRemoveTasks(task.task)}><DeleteForeverIcon /></button></li>
                    ))}
            </ul>
            <button type='submit' className='dialogue-add-project' onClick={handleAddProject}>Add Project {<AddCircleIcon/>}</button>
        </motion.form>
        </Backdrop>
  )
}

export default NewProjectDialog