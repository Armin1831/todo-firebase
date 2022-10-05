import MyDate from "./MyDate";

//icons
import {ReactComponent as LaterTodayLogo} from "../assets/images/icons/later-today-logo.svg";
import {ReactComponent as TomorrowLogo} from "../assets/images/icons/tomorrow-logo.svg";
import {ReactComponent as NextWeekLogo} from "../assets/images/icons/next-week-logo.svg";
import {ReactComponent as TodayCalendarLogo} from "../assets/images/icons/today-calendar-logo.svg";
import {ReactComponent as TomorrowClendarLogo} from "../assets/images/icons/tomorrow-clendar-logo.svg";
import {ReactComponent as NextWeeksLogo} from "../assets/images/icons/next-week.svg";
import {ReactComponent as DailyRepaetLogo} from "../assets/images/icons/daily-repaet.svg";
import {ReactComponent as WeekdaysRepeatLogo} from "../assets/images/icons/weekdays-repaet.svg";
import {ReactComponent as WeeklyRepeatLogo} from "../assets/images/icons/weekly-repaet.svg";
import {ReactComponent as MonthlyRepeatLogo} from "../assets/images/icons/monthly-repaet.svg";
import {ReactComponent as YearlyRepaetLogo} from "../assets/images/icons/yearly-repaet.svg";


export const myDate = new MyDate()
const laterHours = myDate.getLaterHours()
const tomorrow = myDate.getTomorrow()
const nextWeek = myDate.getNextWeek()
export const getHoursFormat = (hours) => {
    return {
        num: hours > 12 ? hours - 12 : hours === 0 ? 12 : hours, ampm: hours >= 12 ? 'PM' : 'AM'
    }
}



export const detailOptionMenu = [
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
    }
];