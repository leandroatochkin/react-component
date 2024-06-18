import React, { useState, useEffect } from 'react';
import { saveProjects } from '../utils/utils.js';
import TaskIcon from '@mui/icons-material/Task';
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import {motion} from 'framer-motion'

const Project = ({ projects }) => {
    const [projectsArr, setProjectsArr] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskValue, setEditTaskValue] = useState('');

    useEffect(() => {
        if (projects && projects.length > 0) {
            setProjectsArr(projects);
        }
    }, [projects]);

    const handleCompleteProject = (project) => {
        const updatedProjectsArr = projectsArr.filter((_proj) => _proj !== project);
        setProjectsArr(updatedProjectsArr);
        saveProjects(updatedProjectsArr);
    };

    const handleDoneButton = (project, task) => {
        const updatedProjectsArr = projectsArr.map((_proj) => {
            if (_proj === project) {
                const updatedTasks = (_proj.tasks || []).map((_task) => {
                    if (_task === task) {
                        return { ..._task, completed: true };
                    }
                    return _task;
                });
                return { ..._proj, tasks: updatedTasks };
            }
            return _proj;
        });

        setProjectsArr(updatedProjectsArr);
        saveProjects(updatedProjectsArr);
    };

    const handleEditButton = (task) => {
        setEditTaskId(task.id);
        setEditTaskValue(task.task);
    };

    const handleSaveButton = (project, task) => {
        const updatedProjectsArr = projectsArr.map((_proj) => {
            if (_proj === project) {
                const updatedTasks = (_proj.tasks || []).map((_task) => {
                    if (_task === task) {
                        return { ..._task, task: editTaskValue };
                    }
                    return _task;
                });
                return { ..._proj, tasks: updatedTasks };
            }
            return _proj;
        });

        setProjectsArr(updatedProjectsArr);
        saveProjects(updatedProjectsArr);
        setEditTaskId(null);
        setEditTaskValue('');
    };

    return (
        <>
            {projectsArr.map((project, index) => (
                <motion.div className='project-bubble' key={index}
                whileHover={{scale: 1.02}}
                transition={{duration: 1}}
                >
                    <div className='project-title-container'>
                        <h3 className='project-title'>{project.name}</h3>
                        <motion.button 
                        className='complete-project-button' 
                        onClick={() => handleCompleteProject(project)}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        >Complete Project {<TaskIcon />}</motion.button>
                    </div>
                    <h3 className='project-bubble-date'>Due: {project.finishDate}</h3>
                    <p className={`${project.importance}-importance`}>{project.importance}</p>
                    <div className='tasks-container'>
                        {(project.tasks || []).map((task, taskIndex) => (//provide an emprty arr in case there's no project o else it wont work
                            <div key={taskIndex} className='task-bubble'>
                                {editTaskId === task.id ? (
                                    <>
                                        <input
                                            type='text'
                                            className='edit-input'
                                            value={editTaskValue}
                                            onChange={(e) => setEditTaskValue(e.target.value)}
                                        />
                                        <button
                                            className='save-button'
                                            onClick={() => handleSaveButton(project, task)}
                                        >
                                            Save {<SaveIcon />}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {task.task}
                                        {!task.completed && (
                                            <>
                                                <div className='tasks-buttons'>
                                                    <button className='done-button' onClick={() => handleDoneButton(project, task)}>
                                                        Done {<DoneIcon />}
                                                    </button>
                                                    <button className='edit-button' onClick={() => handleEditButton(task)}>
                                                        Edit {<EditIcon />}
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </>
    );
};

export default Project;
