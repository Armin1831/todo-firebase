import React from "react";
import "./TasksList.css";

// components
import Task from "../Task/Task";


const TasksList = ({tasks}) => {
    return (
        <div className="tasks-wrapper">
            {tasks.map((task) => {
                return (
                    <Task task={task} key={task.id}/>
                )
            })}
        </div>
    )
};


export default TasksList;