import React, { useState, useEffect } from 'react';
import { saveProjects } from '../utils/utils.js';

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
                const updatedTasks = _proj.tasks.map((_task) => {
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
                const updatedTasks = _proj.tasks.map((_task) => {
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
                <div className='project-bubble' key={index}>
                    <div className='project-title-container'>
                        <h3>{project.name}</h3>
                        <button className='complete-project-button' onClick={() => handleCompleteProject(project)}>Complete Project</button>
                    </div>
                    <h3 className='project-bubble-date'>Due: {project.finishDate}</h3>
                    <p className={`${project.importance}-importance`}>{project.importance}</p>
                    <div className='tasks-container'>
                        {project.tasks.map((task, taskIndex) => (
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
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {task.task}
                                        {!task.completed && (
                                            <>
                                                <button className='done-button' onClick={() => handleDoneButton(project, task)}>
                                                    Done
                                                </button>
                                                <button className='edit-button' onClick={() => handleEditButton(task)}>
                                                    Edit
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default Project;
