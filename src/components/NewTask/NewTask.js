import React, {useContext, useState} from 'react';
import useFirestore from "../../hooks/useFirestore";
import {userContext} from "../../context/userContext";
import DetailOptionMenu from "../DetailOptionMenu/DetailOptionMenu";
import {detailOptionMenu} from "../../utils/dateOptionsUtils";
import OutsideHandler from "../../hooks/useOutsideHandler";
import "./NewTask.css"

//icons
import {ReactComponent as PlusLogo} from "../../assets/images/icons/plus-logo.svg";
import {ReactComponent as CalendarLogo} from "../../assets/images/icons/calendar-logo.svg";
import {ReactComponent as ReminderLogo} from "../../assets/images/icons/reminder-logo.svg";
import {ReactComponent as RecurringLogo} from "../../assets/images/icons/recurring-logo.svg";


const NewTask = ({list}) => {
    const [task, setTask] = useState("");
    const [openNewTaskMenus, setOpenNewTaskMenus] = useState({
        ReminderMenu: false, RepeatMenu: false, DueMenu: false
    });
    const {user: {user}} = useContext(userContext);
    const {createDocument} = useFirestore("tasks");

    const openNewTaskMenu = (e) => {
        setOpenNewTaskMenus({
            ReminderMenu: false, RepeatMenu: false, DueMenu: false, [e]: !openNewTaskMenus[e]
        })
    }

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
                    downloadURL: "",
                    name: ""
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
                            <OutsideHandler
                                setInformationMenus={setOpenNewTaskMenus} menu="DueMenu"
                            >
                                <span className="new-task-bottom__icon">
                                    <CalendarLogo
                                        style={{color: "black"}}
                                        onClick={() => openNewTaskMenu("DueMenu")}
                                    />
                                    <DetailOptionMenu
                                        className={openNewTaskMenus.DueMenu ?
                                            "option-menu option-menu--show" : "option-menu"}
                                        title={detailOptionMenu[1].title}
                                        menuOptions={detailOptionMenu[1].options}
                                    />
                                </span>
                            </OutsideHandler>
                            <OutsideHandler
                                setInformationMenus={setOpenNewTaskMenus} menu="ReminderMenu"
                            >
                                <span className="new-task-bottom__icon">
                                    <ReminderLogo
                                        style={{color: "black"}}
                                        onClick={() => openNewTaskMenu("ReminderMenu")}
                                    />
                                    <DetailOptionMenu
                                        className={openNewTaskMenus.ReminderMenu ?
                                            "option-menu option-menu--show" : "option-menu"}
                                        title={detailOptionMenu[0].title}
                                        menuOptions={detailOptionMenu[0].options}
                                    />
                                </span>
                            </OutsideHandler>
                            <OutsideHandler
                                setInformationMenus={setOpenNewTaskMenus} menu="RepeatMenu"
                            >
                                <span className="new-task-bottom__icon">
                                    <RecurringLogo
                                        style={{color: "black"}}
                                        onClick={() => openNewTaskMenu("RepeatMenu")}
                                    />
                                    <DetailOptionMenu
                                        className={openNewTaskMenus.RepeatMenu ?
                                            "option-menu option-menu--show" : "option-menu"}
                                        title={detailOptionMenu[2].title}
                                        menuOptions={detailOptionMenu[2].options}
                                    />
                                </span>
                            </OutsideHandler>
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
