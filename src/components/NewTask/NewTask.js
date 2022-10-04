import React, {useContext, useState} from 'react';
import useFirestore from "../../hooks/useFirestore";
import {userContext} from "../../context/userContext";
import "./NewTask.css"

//icons
import {ReactComponent as PlusLogo} from "../../assets/images/icons/plus-logo.svg";


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
                category: [],
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
                    <button className="new-task__add"
                            onClick={() => addNewTask()}
                    >
                        Add
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewTask;
