import React from 'react';
import {Link} from "react-router-dom";
import {arrayRemove, arrayUnion} from "firebase/firestore"
import useFirestore from "../../hooks/useFirestore";
import {myDate} from "../../utils/dateOptionsUtils";
import "./Task.css";

// icons
import {ReactComponent as DoneLogo} from "../../assets/images/icons/done-svgrepo-com.svg";
import {ReactComponent as StarLogo} from "../../assets/images/icons/star-logo.svg";
import {ReactComponent as StarFillLogo} from "../../assets/images/icons/starFill.svg";
import {ReactComponent as SunLogo} from "../../assets/images/icons/sun-logo.svg";
import {ReactComponent as ReminderLogo} from "../../assets/images/icons/reminder-logo.svg";
import {ReactComponent as DueDateLogo} from "../../assets/images/icons/due-date.svg";
import {ReactComponent as RecurringLogo} from "../../assets/images/icons/recurring-logo.svg";
import {ReactComponent as AddFileLogo} from "../../assets/images/icons/add-file-logo.svg";
import {ReactComponent as NoteLogo} from "../../assets/images/icons/note-logo.svg";


const Task = ({className, task, showInfo}) => {
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
            {
                task &&
                <div className={className ? "task detail-task" : "task"}>
                    {task.isCompleted ?
                        <span onClick={() => completeTask(task)}><DoneLogo/></span> :
                        <span className="new-task-top__circle" onClick={() => completeTask(task)}/>
                    }
                    <Link to={showInfo ? `id/${task.id}` : ''} style={{width: "100%"}}>
                        <div className="task-info" style={{width: "100%"}}>
                            <p className="task__content">{task.text}</p>
                            {showInfo &&
                                <div className="task-info__bottom">
                                    {task.steps.length > 0 &&
                                        <span className="task-info__steps">
                                            {task.steps.filter(step => step.isCompleted).length} of {task.steps.length}
                                        </span>
                                    }
                                    {task.repeat !== "" &&
                                        <span className="task-info__steps">
                                            <RecurringLogo style={{width: "16px", height: "16px"}}/>
                                            {task.repeat}
                                        </span>
                                    }
                                    {task.reminder !== "" &&
                                        <span className="task-info__steps">
                                            <ReminderLogo style={{width: "16px", height: "16px"}}/>
                                            {task.reminder !== "" ?
                                                task.reminder.toDate().getDay() === myDate.date.getDay() + 1 ?
                                                    "Tomorrow" :
                                                    task.reminder.toDate().getDate() === myDate.date.getDate() ?
                                                        "Today" : task.reminder.toDate().toDateString() : null}
                                        </span>
                                    }
                                    {task.dueDate !== "" &&
                                        <span className="task-info__steps">
                                            <DueDateLogo style={{width: "16px", height: "16px"}}/>
                                            {task.dueDate !== "" ?
                                                task.dueDate.toDate().getDay() === myDate.date.getDay() + 1 ?
                                                    "Tomorrow" : task.dueDate.toDate().getDate() === myDate.date.getDate() ?
                                                        "Today" : task.dueDate.toDate().toDateString()
                                                : null}
                                        </span>
                                    }
                                    {task.isInMyDay &&
                                        <span className="task-info__steps">
                                            <SunLogo style={{width: "16px", height: "16px"}}/>
                                            My Day
                                        </span>
                                    }
                                    {task.categories.length > 0 &&
                                        task.categories.map(category => (
                                            <span
                                                key={category.name}
                                                className="task-info__steps" style={{color: category.color}}>
                                                <span className="task-info__category"
                                                      style={{
                                                          backgroundColor: category.color,
                                                          borderColor: category.backgroundColor
                                                      }}
                                                />
                                                {category.name}
                                            </span>
                                        ))
                                    }
                                    {task.file.name !== "" &&
                                        <span className="task-info__steps">
                                            <AddFileLogo style={{width: "16px", height: "16px"}}/>
                                            File attached
                                        </span>
                                    }
                                    {task.note !== "" &&
                                        <span className="task-info__steps">
                                            <NoteLogo style={{width: "16px", height: "16px"}}/>
                                            Note
                                        </span>
                                    }
                                </div>
                            }
                        </div>
                    </Link>
                    <span className="task__isImportant" onClick={() => importTask(task)}>
                        {task.isImportant ? <StarFillLogo/> : <StarLogo/>}
                    </span>
                </div>
            }
        </>
    );
};

export default Task;
