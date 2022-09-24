import React from "react";
import "./TasksList.css";

// components
import Task from "../Task/Task";


const TasksList = () => {
    return (
        <div className="tasks-wrapper">
            <Task/>
            <Task/>
        </div>
    )
};


export default TasksList;