import React, {useContext, useState} from 'react';
import {detailOptionMenu, getHoursFormat, myDate} from "../../utils/dateOptionsUtils";
import useFirestore from "../../hooks/useFirestore";
import {Timestamp, arrayUnion, arrayRemove} from "firebase/firestore";
import OutsideHandler from "../../hooks/useOutsideHandler";
import {taskContext} from "../../context/taskContext";
import "./DetailOptions.css";

// components
import DetailOptionHead from "../DetailsOptionHead/DetailOptionHead";
import DetailOptionMenu from "../DetailOptionMenu/DetailOptionMenu";

// icons
import {ReactComponent as ReminderLogo} from "../../assets/images/icons/reminder-logo.svg";
import {ReactComponent as DueDateLogo} from "../../assets/images/icons/due-date.svg";
import {ReactComponent as RecurringLogo} from "../../assets/images/icons/recurring-logo.svg";


const DetailOptions = () => {
    const {task} = useContext(taskContext)
    const {updateDocument} = useFirestore("tasks")
    const [informationMenus, setInformationMenus] = useState({
        ReminderMenu: false, RepeatMenu: false, DueMenu: false
    });

    const openInformationMenu = (e) => {
        setInformationMenus({
            ReminderMenu: false,
            RepeatMenu: false,
            DueMenu: false,
            [e]: !informationMenus[e]
        })
    }

    // titles
    const reminderTitle = {
        hours: task.reminder !== "" ?
            `Remind My At 
         ${getHoursFormat(task.reminder.toDate().getHours()).num}
         ${getHoursFormat(task.reminder.toDate().getHours()).ampm}`
            : "Remind My",
        day: task.reminder !== "" ?
            task.reminder.toDate().getDay() === myDate.date.getDay() + 1 ?
                "Tomorrow" :
                task.reminder.toDate().getDate() === myDate.date.getDate() ?
                    "Today" : task.reminder.toDate().toDateString() : null

    }
    const dueTitle = {
        hours: task.dueDate !== "" ?
            task.dueDate.toDate().getDay() === myDate.date.getDay() + 1 ?
                "Tomorrow" : task.dueDate.toDate().getDate() === myDate.date.getDate() ?
                    "Today" : "Due " + task.dueDate.toDate().toDateString()
            : "Add Due Date",
        day: null
    }
    const repeatTitle = {
        hours: task.repeat !== "" ?
            task.repeat
            : "Repeat",
        day: null
    }

    const updateSomeDates = (title) => async (timeObject, close = true) => {
        switch (title) {
            case "Reminder":
                if (timeObject) {
                    close && openInformationMenu("ReminderMenu")
                    await updateDocument(task.id, {
                        reminder: Timestamp.fromDate(timeObject)
                    })
                    break;
                }
                await updateDocument(task.id, {
                    reminder: ""
                })
                break;
            case "Due":
                if (timeObject) {
                    close && openInformationMenu("DueMenu")
                    await updateDocument(task.id, {
                        dueDate: Timestamp.fromDate(timeObject),
                        lists: task.lists.includes("planned") ? task.lists : arrayUnion("planned")
                    })
                    break;
                }
                await updateDocument(task.id, {
                    dueDate: "",
                    lists: arrayRemove("planned")
                })
                break;
            case "Repeat":
                if (timeObject) {
                    close && openInformationMenu("RepeatMenu")
                    await updateDocument(task.id, {
                        repeat: timeObject
                    })
                    break;
                }
                await updateDocument(task.id, {
                    repeat: ""
                })
                break;
            default:
                break;
        }
    }


    return (
        <div className="options">
            <div className="details-option p-relative">
                <OutsideHandler
                    setInformationMenus={setInformationMenus} menu="ReminderMenu"
                >
                    <DetailOptionHead
                        openInformationMenu={() => openInformationMenu("ReminderMenu")}
                        logo={ReminderLogo}
                        hours={reminderTitle.hours}
                        day={reminderTitle.day}
                        updateSomeDates={updateSomeDates("Reminder")}
                    />
                    <DetailOptionMenu
                        className={informationMenus.ReminderMenu ?
                            "details-date-option details-date-option--show" : "details-date-option"}
                        title={detailOptionMenu[0].title}
                        menuOptions={detailOptionMenu[0].options}
                        updateSomeDates={updateSomeDates("Reminder")}
                    />
                </OutsideHandler>
            </div>
            <div className="details-option p-relative">
                <OutsideHandler
                    setInformationMenus={setInformationMenus} menu="DueMenu"
                >
                    <DetailOptionHead
                        openInformationMenu={() => openInformationMenu("DueMenu")}
                        logo={DueDateLogo}
                        hours={dueTitle.hours}
                        updateSomeDates={updateSomeDates("Due")}
                    />
                    <DetailOptionMenu
                        className={informationMenus.DueMenu ?
                            "details-date-option details-date-option--show" : "details-date-option"}
                        title={detailOptionMenu[1].title}
                        menuOptions={detailOptionMenu[1].options}
                        updateSomeDates={updateSomeDates("Due")}
                    />
                </OutsideHandler>
            </div>
            <div className="details-option p-relative">
                <OutsideHandler
                    setInformationMenus={setInformationMenus} menu="RepeatMenu"
                >
                    <DetailOptionHead
                        openInformationMenu={() => openInformationMenu("RepeatMenu")}
                        logo={RecurringLogo}
                        hours={repeatTitle.hours}
                        updateSomeDates={updateSomeDates("Repeat")}
                    />
                    <DetailOptionMenu
                        className={informationMenus.RepeatMenu ?
                            "details-date-option details-date-option__repeat details-date-option--show "
                            : "details-date-option"}
                        title={detailOptionMenu[2].title}
                        menuOptions={detailOptionMenu[2].options}
                        updateSomeDates={updateSomeDates("Repeat")}
                        showDatePicker={false}
                    />
                </OutsideHandler>
            </div>
        </div>
    );
};

export default DetailOptions;
