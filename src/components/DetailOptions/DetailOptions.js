import React, {useState} from 'react';
import "./DetailOptions.css";
import OutsideHandler from "../../hooks/useOutsideHandler";
import {days} from "../../utils";

// components
import DetailOptionHead from "../DetailsOptionHead/DetailOptionHead";

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
import DetailOptionMenu from "../DetailOptionMenu/DetailOptionMenu";


const now = new Date();
const today = now.getDay() - 1
const hours = now.getHours();
const hours1 = now.getHours() + 5;
const minutes = now.getMinutes();
const ampm = hours >= 12 ? 'PM' : 'AM';
const ampm1 = hours1 >= 12 ? 'PM' : 'AM';
const getToday = (today, isTomorrow = false) => {
    if(isTomorrow){
        return today === -1 ? days[0] : days[today + 1]
    }
    return today === -1 ? days[6] : days[today]
}
const detailOptionMenu = [
    {
        title: "Reminder",
        options: [
            {
                title: "Later today",
                logo: <LaterTodayLogo/>,
                value: `${hours + 5}:${minutes} ${ampm1}`
            },
            {
                title: "Tomorrow",
                logo: <TomorrowLogo/>,
                value: `${getToday(today,true).slice(0, 3)}, ${now.getHours()} ${ampm}`
            },
            {
                title: "Next week",
                logo: <NextWeekLogo/>,
                value: `${days[0].slice(0, 3)}, ${now.getHours()} ${ampm}`
            }
        ]
    },
    {
        title: "Due",
        options: [
            {
                title: "Today",
                logo: <TodayCalendarLogo/>,
                value: `${getToday(today).slice(0, 3)}`
            },
            {
                title: "Tomorrow",
                logo: <TomorrowClendarLogo/>,
                value: `${getToday(today,true).slice(0, 3)}`
            },
            {
                title: "Next week",
                logo: <NextWeeksLogo/>,
                value: days[0].slice(0, 3)
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


const DetailOptions = () => {
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
                        />
                    </div>
                </OutsideHandler>
            </div>
        </div>
    );
};

export default DetailOptions;
