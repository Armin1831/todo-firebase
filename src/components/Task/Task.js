import React from 'react';
import "./Task.css";
import {arrayRemove, arrayUnion} from "firebase/firestore"
import useFirestore from "../../hooks/useFirestore";

// icons
import {ReactComponent as DoneLogo} from "../../assets/images/icons/done-svgrepo-com.svg";
import {ReactComponent as StarLogo} from "../../assets/images/icons/star-logo.svg";
import {ReactComponent as StarFillLogo} from "../../assets/images/icons/starFill.svg";
import {Link} from "react-router-dom";


const Task = ({className, task}) => {
    const {updateDocument} = useFirestore("tasks");

    const completeTask = async (task) => {
        if (task.dueDate !== "") {

        }
        await updateDocument(task.id, {
            isCompleted: !task.isCompleted,
            lists: task.dueDate !== "" ?
                task.isCompleted ? arrayUnion("planned") : arrayRemove("planned")
                : task.lists
        })
    }

    const importTask = async (task) => {
        await updateDocument(task.id, {
            isImportant: !task.isImportant,
            lists: task.isImportant ? arrayRemove("important") : arrayUnion("important")
        })
    }

    return (
        <>
            {task && <div className={className ? "task detail-task" : "task"}>
                {task.isCompleted ?
                    <span onClick={() => completeTask(task)}><DoneLogo/></span> :
                    <span className="new-task-top__circle" onClick={() => completeTask(task)}/>
                }
                <Link to={`/tasks/id/${task.id}`} style={{width: "100%"}}>
                    <p className="task__content">{task.text}</p>
                </Link>
                <span className="task__isImportant" onClick={() => importTask(task)}>
                    {task.isImportant ? <StarFillLogo/> : <StarLogo/>}
                </span>
            </div>}
        </>
    );
};

export default Task;
