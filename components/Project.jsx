import React, { useState, useEffect } from 'react';
import { saveProjects } from '../utils/utils.js';

const Project = ({ projects }) => {
    const [projectsArr, setProjectsArr] = useState([]);

    useEffect(() => {
        if (projects && projects.length > 0) {
            setProjectsArr(projects);
        }
    }, [projects]);

    console.log(projectsArr);

    const handleCompleteProject = (project) => {
        const updatedProjectsArr = projectsArr.filter((p) => p !== project);
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
                            !task.completed && <div key={taskIndex} className='task-bubble'>
                            {task.task} {!task.completed && (
                                <button className='done-button' onClick={() => handleDoneButton(project, task)}>
                                    Done
                                </button>
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
