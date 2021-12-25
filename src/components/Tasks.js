import React from 'react'
import Task from './Task';

const Tasks = ({tasks, deleteTask, toggleDone}) => {
    console.log(tasks);
    return (
        <div>
            {tasks.map((task) => (
                <Task deleteTask={deleteTask} key={task.id} task={task} toggleDone={toggleDone}/>
            ))}
        </div>
    )
}

export default Tasks
