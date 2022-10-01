import React, {useState} from 'react';
import "./DetailOptions.css";
import useFirestore from "../../hooks/useFirestore";
import {Timestamp, arrayUnion} from "firebase/firestore";
import OutsideHandler from "../../hooks/useOutsideHandler";
import MyDate from "../../utils/MyDate";

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


const detailOptionMenu = [
    {
        title: "Reminder",
        options: [
            {
                title: "Later today",
                logo: <LaterTodayLogo/>,
                timeObject: laterHours.value,
                value: `${laterHours.title > 12 ?
                    laterHours.title - 12 : laterHours.title === 0 ? 12 : laterHours.title}:00 
                ${laterHours.title >= 12 ? 'PM' : 'AM'}`
            },
            {
                title: "Tomorrow",
                logo: <TomorrowLogo/>,
                timeObject: tomorrow.value,
                value: `${tomorrow.title.slice(0, 3)}, ${tomorrow.value.getHours() > 12 ?
                    tomorrow.value.getHours() - 12 : tomorrow.value.getHours() === 0 ? 12 : tomorrow.value.getHours()} 
                    ${tomorrow.value.getHours() >= 12 ? 'PM' : 'AM'}`
            },
            {
                title: "Next week",
                logo: <NextWeekLogo/>,
                timeObject: nextWeek.value,
                value: `${nextWeek.title.slice(0, 3)}, ${nextWeek.value.getHours() > 12 ?
                    nextWeek.value.getHours() - 12 : nextWeek.value.getHours() === 0 ? 12 : nextWeek.value.getHours()} 
                ${nextWeek.value.getHours() >= 12 ? 'PM' : 'AM'}`
            }
        ]
    },
    {
        title: "Due",
        options: [
            {
                title: "Today",
                logo: <TodayCalendarLogo/>,
                timeObject: myDate.date,
                value: myDate.today.slice(0, 3)
            },
            {
                title: "Tomorrow",
                logo: <TomorrowClendarLogo/>,
                timeObject: tomorrow.value,
                value: tomorrow.title.slice(0, 3)
            },
            {
                title: "Next week",
                logo: <NextWeeksLogo/>,
                timeObject: nextWeek.value,
                value: nextWeek.title.slice(0, 3)
            }
        ]
    },
    {
        title: "Repeat",
        options: [
            {
                title: "Daily",
                logo: <DailyRepaetLogo/>
            },
            {
                title: "Weekdays",
                logo: <WeekdaysRepeatLogo/>
            },
            {
                title: "Weekly",
                logo: <WeeklyRepeatLogo/>
            },
            {
                title: "Monthly",
                logo: <MonthlyRepeatLogo/>
            },
            {
                title: "Yearly",
                logo: <YearlyRepaetLogo/>
            }
        ]
    }
]


const DetailOptions = ({task}) => {
    const {updateDocument} = useFirestore("tasks")
    const [informationMenus, setInformationMenus] = useState({
        ReminderMenu: false,
        RepeatMenu: false,
        DueMenu: false
    })
    const openInformationMenu = (e) => {
        setInformationMenus({
            ReminderMenu: false,
            RepeatMenu: false,
            DueMenu: false,
            [e]: !informationMenus[e]
        })
    }
    const updateSomeDates = (title) => async (timeObject) => {
        switch (title) {
            case "Reminder":
                await updateDocument(task.id, {
                    reminder: Timestamp.fromDate(timeObject)
                })
                break;
            case "Due":
                await updateDocument(task.id, {
                    dueDate: Timestamp.fromDate(timeObject),
                    lists: task.lists.includes("planned") ? task.lists : arrayUnion("planned")
                })
                break;
            case "Repeat":
                await updateDocument(task.id, {
                    repeat: timeObject
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
                        openInformationMenu={openInformationMenu}
                        logo={<ReminderLogo/>}
                        menuName="ReminderMenu"
                        title="Remind My"
                    />
                    <div className={informationMenus.ReminderMenu ?
                        "details-date-option details-date-option--show" : "details-date-option"
                    }>
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
                        openInformationMenu={openInformationMenu}
                        title="Add due date"
                        logo={<DueDateLogo style={{color: "#797775"}}/>}
                        menuName="DueMenu"
                    />
                    <div className={informationMenus.DueMenu ?
                        "details-date-option details-date-option--show" : "details-date-option"}
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
                        openInformationMenu={openInformationMenu}
                        title="Repeat"
                        logo={<RecurringLogo/>}
                        menuName="RepeatMenu"
                    />
                    <div
                        className={informationMenus.RepeatMenu ?
                            "details-date-option details-date-option--show" : "details-date-option"}
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
