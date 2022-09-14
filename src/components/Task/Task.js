import React from 'react';
import "./Task.css";
import {ReactComponent as StarLogo} from "../../assets/images/icons/star-logo.svg";

const Task = () => {
    return (
        <div className="task">
            <span className="new-task-top__circle"/>
            <p className="task__content">Lorem ipsum dolor sit amet.</p>
            <span className="task__isImportant">
               <StarLogo/>
            </span>
        </div>
    );
};

export default Task;
