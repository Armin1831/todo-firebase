import React from "react";
import {Link} from "react-router-dom";
import "./TasksList.css";

// components
import Task from "../Task/Task";


const TasksList = ({tasks}) => {
    return (

        <div className="tasks-wrapper">
            {tasks.map((task) => {
                return (
                    <Link to={`/tasks/id/${task.id}`}>
                        <Task key={task.id} task={task}/>
                    </Link>
                )
            })}
        </div>
    )
};


export default TasksList;