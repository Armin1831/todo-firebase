import React, {useContext, useState} from 'react';
import useFirestore from "../../hooks/useFirestore";
import {userContext} from "../../context/userContext";
import "./NewTask.css"

//icons
import {ReactComponent as PlusLogo} from "../../assets/images/icons/plus-logo.svg";
import {ReactComponent as CalendarLogo} from "../../assets/images/icons/calendar-logo.svg";
import {ReactComponent as ReminderLogo} from "../../assets/images/icons/reminder-logo.svg";
import {ReactComponent as RecurringLogo} from "../../assets/images/icons/recurring-logo.svg";


const NewTask = ({list}) => {
    const [task, setTask] = useState("");
    const {user: {user}} = useContext(userContext);
    const {createDocument} = useFirestore("tasks");


    const addNewTask = async () => {
        if (task !== "") {
            const taskData = {
                text: task,
                constructionTime: new Date().getTime(),
                userCreator: user.uid,
                isCompleted: false,
                isImportant: list === "important",
                isInMyDay: list === "my_day",
                lists: list === "inbox" ? ["inbox"] : [list, "inbox"],
                reminder: "",
                dueDate: "",
                repeat: "",
                categories: [],
                note: "",
                steps: [],
                file: {
                    downloadURL:"",
                    name : ""
                }
            }
            setTask("")
            await createDocument(taskData)
        }
    }

    return (
        <section className="new-task">
            <div className="container">
                <div className="new-task-wrapper ">
                    <div className="new-task-top">
                        <PlusLogo/>
                        <span className="new-task-top__circle hide"/>
                        <input
                            type="text"
                            placeholder="Add a task"
                            className="new-task-top__input"
                            value={task}
                            onKeyDown={(e) => e.key === "Enter" && addNewTask()}
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </div>
                    <div className="new-task-bottom new-task-bottom--show">
                        <div className="new-task-bottom__options">
                            <span className="new-task-bottom__icon">
                                <CalendarLogo style={{color:"black"}}/>
                            </span>
                            <span className="new-task-bottom__icon">
                                <ReminderLogo style={{color:"black"}}/>
                            </span>
                            <span className="new-task-bottom__icon">
                                <RecurringLogo style={{color:"black"}}/>
                            </span>
                        </div>
                        <button className="new-task-bottom__add"
                                onClick={() => addNewTask()}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewTask;
