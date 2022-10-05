import React, {useContext, useState} from 'react';
import "./DetailOptions.css";
import useFirestore from "../../hooks/useFirestore";
import {Timestamp, arrayUnion, arrayRemove} from "firebase/firestore";
import OutsideHandler from "../../hooks/useOutsideHandler";
import MyDate from "../../utils/MyDate";
import {taskContext} from "../../context/taskContext";

// components
import DetailOptionHead from "../DetailsOptionHead/DetailOptionHead";
import DetailOptionMenu from "../DetailOptionMenu/DetailOptionMenu";

// icons
import {ReactComponent as ReminderLogo} from "../../assets/images/icons/reminder-logo.svg";
import {ReactComponent as LaterTodayLogo} from "../../assets/images/icons/later-today-logo.svg";
import {ReactComponent as TomorrowLogo} from "../../assets/images/icons/tomorrow-logo.svg";
import {ReactComponent as NextWeekLogo} from "../../assets/images/icons/next-week-logo.svg";
import {ReactComponent as DueDateLogo} from "../../assets/images/icons/due-date.svg";
import {ReactComponent as TodayCalendarLogo} from "../../assets/images/icons/today-calendar-logo.svg";
import {ReactComponent as TomorrowClendarLogo} from "../../assets/images/icons/tomorrow-clendar-logo.svg";
import {ReactComponent as NextWeeksLogo} from "../../assets/images/icons/next-week.svg";
import {ReactComponent as RecurringLogo} from "../../assets/images/icons/recurring-logo.svg";
import {ReactComponent as DailyRepaetLogo} from "../../assets/images/icons/daily-repaet.svg";
import {ReactComponent as WeekdaysRepeatLogo} from "../../assets/images/icons/weekdays-repaet.svg";
import {ReactComponent as WeeklyRepeatLogo} from "../../assets/images/icons/weekly-repaet.svg";
import {ReactComponent as MonthlyRepeatLogo} from "../../assets/images/icons/monthly-repaet.svg";
import {ReactComponent as YearlyRepaetLogo} from "../../assets/images/icons/yearly-repaet.svg";


const myDate = new MyDate()
const laterHours = myDate.getLaterHours()
const tomorrow = myDate.getTomorrow()
const nextWeek = myDate.getNextWeek()
const getHoursFormat = (hours) => {
    return {
        num: hours > 12 ? hours - 12 : hours === 0 ? 12 : hours, ampm: hours >= 12 ? 'PM' : 'AM'
    }
}

const detailOptionMenu = [
    {
        title: "Reminder", options: [{
            title: "Later today",
            logo: LaterTodayLogo,
            timeObject: laterHours.value,
            value: `${getHoursFormat(laterHours.title).num}:00 
                ${getHoursFormat(laterHours.title).ampm}`
        }, {
            title: "Tomorrow",
            logo: TomorrowLogo,
            timeObject: tomorrow.value,
            value: `${tomorrow.title.slice(0, 3)}, ${getHoursFormat(tomorrow.value.getHours()).num} 
                    ${getHoursFormat(tomorrow.value.getHours()).ampm}`
        }, {
            title: "Next week",
            logo: NextWeekLogo,
            timeObject: nextWeek.value,
            value: `${nextWeek.title.slice(0, 3)}, ${getHoursFormat(nextWeek.value.getHours()).num} 
                ${getHoursFormat(nextWeek.value.getHours()).ampm}`
        }]
    },
    {
        title: "Due", options: [{
            title: "Today", logo: TodayCalendarLogo, timeObject: myDate.date, value: myDate.today.slice(0, 3)
        }, {
            title: "Tomorrow", logo: TomorrowClendarLogo, timeObject: tomorrow.value, value: tomorrow.title.slice(0, 3)
        }, {
            title: "Next week", logo: NextWeeksLogo, timeObject: nextWeek.value, value: nextWeek.title.slice(0, 3)
        }]
    },
    {
        title: "Repeat", options: [{
            title: "Daily", logo: DailyRepaetLogo
        }, {
            title: "Weekdays", logo: WeekdaysRepeatLogo
        }, {
            title: "Weekly", logo: WeeklyRepeatLogo
        }, {
            title: "Monthly", logo: MonthlyRepeatLogo
        }, {
            title: "Yearly", logo: YearlyRepaetLogo
        }]
    }];


const DetailOptions = () => {
    const {task} = useContext(taskContext)
    const {updateDocument} = useFirestore("tasks")
    const [informationMenus, setInformationMenus] = useState({
        ReminderMenu: false, RepeatMenu: false, DueMenu: false
    })
    const openInformationMenu = (e) => {
        setInformationMenus({
            ReminderMenu: false, RepeatMenu: false, DueMenu: false, [e]: !informationMenus[e]
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


    const updateSomeDates = (title) => async (timeObject) => {
        switch (title) {
            case "Reminder":
                if (timeObject) {
                    openInformationMenu("ReminderMenu")
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
                    openInformationMenu("DueMenu")
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
                    openInformationMenu("RepeatMenu")
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
                <OutsideHandler setInformationMenus={setInformationMenus} menu="ReminderMenu">
                    <DetailOptionHead
                        openInformationMenu={() => openInformationMenu("ReminderMenu")}
                        logo={ReminderLogo}
                        hours={reminderTitle.hours}
                        day={reminderTitle.day}
                        updateSomeDates={updateSomeDates("Reminder")}
                    />
                    <div
                        className={informationMenus.ReminderMenu ? "details-date-option details-date-option--show" : "details-date-option"}>
                        <DetailOptionMenu
                            title={detailOptionMenu[0].title}
                            menuOptions={detailOptionMenu[0].options}
                            updateSomeDates={updateSomeDates("Reminder")}
                        />
                    </div>
                </OutsideHandler>
            </div>
            <div className="details-option p-relative">
                <OutsideHandler setInformationMenus={setInformationMenus} menu="DueMenu">
                    <DetailOptionHead
                        openInformationMenu={() => openInformationMenu("DueMenu")}
                        logo={DueDateLogo}
                        hours={dueTitle.hours}
                        updateSomeDates={updateSomeDates("Due")}
                    />
                    <div
                        className={informationMenus.DueMenu ? "details-date-option details-date-option--show" : "details-date-option"}
                    >
                        <DetailOptionMenu
                            title={detailOptionMenu[1].title}
                            menuOptions={detailOptionMenu[1].options}
                            updateSomeDates={updateSomeDates("Due")}
                        />
                    </div>
                </OutsideHandler>
            </div>
            <div className="details-option p-relative">
                <OutsideHandler setInformationMenus={setInformationMenus} menu="RepeatMenu">
                    <DetailOptionHead
                        openInformationMenu={() => openInformationMenu("RepeatMenu")}
                        logo={RecurringLogo}
                        hours={repeatTitle.hours}
                        updateSomeDates={updateSomeDates("Repeat")}
                    />
                    <div
                        className={informationMenus.RepeatMenu ? "details-date-option details-date-option--show" : "details-date-option"}
                        style={{top: "auto", bottom: "-2rem"}}
                    >
                        <DetailOptionMenu
                            title={detailOptionMenu[2].title}
                            menuOptions={detailOptionMenu[2].options}
                            updateSomeDates={updateSomeDates("Repeat")}
                        />
                    </div>
                </OutsideHandler>
            </div>
        </div>
    );
};

export default DetailOptions;
