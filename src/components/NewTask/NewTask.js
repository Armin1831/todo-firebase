import React, {useContext, useEffect, useState} from 'react';
import useFirestore from "../../hooks/useFirestore";
import {userContext} from "../../context/userContext";
import DetailOptionMenu from "../DetailOptionMenu/DetailOptionMenu";
import {detailOptionMenu, myDate} from "../../utils/dateOptionsUtils";
import {Timestamp} from "firebase/firestore";
import OutsideHandler from "../../hooks/useOutsideHandler";
import "./NewTask.css"

//icons
import {ReactComponent as PlusLogo} from "../../assets/images/icons/plus-logo.svg";
import {ReactComponent as CalendarLogo} from "../../assets/images/icons/calendar-logo.svg";
import {ReactComponent as ReminderLogo} from "../../assets/images/icons/reminder-logo.svg";
import {ReactComponent as RecurringLogo} from "../../assets/images/icons/recurring-logo.svg";


const NewTask = ({list}) => {
    const [task, setTask] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [reminderDate, setReminderDate] = useState(null);
    const [repeatDate, setRepeatDate] = useState(null);
    const [openNewTaskMenus, setOpenNewTaskMenus] = useState({
        ReminderMenu: false, RepeatMenu: false, DueMenu: false
    });
    const {user: {user}} = useContext(userContext);
    const {createDocument} = useFirestore("tasks");


    useEffect(() => {
        setDueDate(null)
        setReminderDate(null)
        setRepeatDate(null)
    },[list.id]);

    const openNewTaskMenu = (e) => {
        setOpenNewTaskMenus({
            ReminderMenu: false, RepeatMenu: false, DueMenu: false, [e]: !openNewTaskMenus[e]
        })
    };

    const updateSomeDates = (title) => (timeObj) => {
        switch (title) {
            case "Reminder":
                setReminderDate(timeObj)
                openNewTaskMenu("ReminderMenu")
                break;
            case "Due":
                setDueDate(timeObj)
                openNewTaskMenu("DueMenu")
                break;
            case "Repeat":
                setRepeatDate(timeObj)
                openNewTaskMenu("RepeatMenu")
                break;
            default:
                break;
        }
    }
    const addNewTask = async () => {
        if (task !== "") {
            const taskData = {
                text: task,
                constructionTime: new Date().getTime(),
                userCreator: user.uid,
                isCompleted: false,
                isImportant: list.id === "important",
                isInMyDay: list.id === "my_day",
                lists: dueDate ?
                    [...new Set(["inbox", "planned", list.id])] : list.id === "inbox" ?
                        ["inbox"] : [...new Set([list.id, "inbox"])],
                reminder: reminderDate ? Timestamp.fromDate(reminderDate) : "",
                dueDate: dueDate ?
                    Timestamp.fromDate(dueDate) : list.id === "planned" ?
                        Timestamp.fromDate(new Date()) : ""
                ,
                repeat: repeatDate ? repeatDate : "",
                categories: [],
                note: "",
                steps: [],
                file: {
                    downloadURL: "",
                    name: ""
                }
            }
            setRepeatDate(null)
            setReminderDate(null)
            setDueDate(null)
            setTask("")
            await createDocument(taskData)
        }
    }

    // titles
    const reminderTitle = reminderDate ?
        reminderDate.getDay() === myDate.date.getDay() + 1 ?
            "Tomorrow" :
            reminderDate.getDate() === myDate.date.getDate() ?
                "Today" : reminderDate.toDateString() : null

    const dueTitle = dueDate ?
        dueDate.getDay() === myDate.date.getDay() + 1 ?
            "Tomorrow" : dueDate.getDate() === myDate.date.getDate() ?
                "Today" : dueDate.toDateString()
        : null


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
                                <div className="new-task-bottom__icon">
                                    <div className="option-menu__top"
                                         style={{backgroundColor: dueDate ? "white" : ""}}
                                    >
                                        <CalendarLogo
                                            style={{color: "#292827", cursor: "pointer"}}
                                            onClick={() => openNewTaskMenu("DueMenu")}
                                        />
                                        {dueDate &&
                                            <span>
                                                {dueTitle}
                                            </span>
                                        }
                                    </div>
                                    <DetailOptionMenu
                                        className={openNewTaskMenus.DueMenu ?
                                            "option-menu option-menu--show" : "option-menu"}
                                        title={detailOptionMenu[1].title}
                                        menuOptions={detailOptionMenu[1].options}
                                        updateSomeDates={updateSomeDates("Due")}
                                    />
                                </div>
                            </OutsideHandler>
                            <OutsideHandler
                                setInformationMenus={setOpenNewTaskMenus} menu="ReminderMenu"
                            >
                                <div className="new-task-bottom__icon">
                                    <div className="option-menu__top"
                                         style={{backgroundColor: reminderDate ? "white" : ""}}
                                    >
                                        <ReminderLogo
                                            style={{color: "#292827", cursor: "pointer"}}
                                            onClick={() => openNewTaskMenu("ReminderMenu")}
                                        />
                                        {reminderDate &&
                                            <span>
                                                {reminderTitle}
                                            </span>
                                        }
                                    </div>
                                    <DetailOptionMenu
                                        className={openNewTaskMenus.ReminderMenu ?
                                            "option-menu option-menu--show" : "option-menu"}
                                        title={detailOptionMenu[0].title}
                                        menuOptions={detailOptionMenu[0].options}
                                        updateSomeDates={updateSomeDates("Reminder")}
                                    />
                                </div>
                            </OutsideHandler>
                            <OutsideHandler
                                setInformationMenus={setOpenNewTaskMenus} menu="RepeatMenu"
                            >
                                <div className="new-task-bottom__icon">
                                    <div className="option-menu__top"
                                         style={{backgroundColor: repeatDate ? "white" : ""}}
                                    >
                                        <RecurringLogo
                                            style={{color: "#292827", cursor: "pointer"}}
                                            onClick={() => openNewTaskMenu("RepeatMenu")}
                                        />
                                        {repeatDate &&
                                            <span>
                                                {repeatDate}
                                            </span>
                                        }
                                    </div>
                                    <DetailOptionMenu
                                        className={openNewTaskMenus.RepeatMenu ?
                                            "option-menu option-menu--show" : "option-menu"}
                                        title={detailOptionMenu[2].title}
                                        menuOptions={detailOptionMenu[2].options}
                                        updateSomeDates={updateSomeDates("Repeat")}
                                    />
                                </div>
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
