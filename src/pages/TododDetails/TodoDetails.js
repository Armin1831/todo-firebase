import React from "react";
import {Link} from "react-router-dom";
import "./TodoDetails.css";
// components


// icons
import { ReactComponent as StarLogo } from "../../assets/images/icons/star-logo.svg";
import { ReactComponent as PlusLogo } from "../../assets/images/icons/plus-logo.svg";
import { ReactComponent as SunLogo } from "../../assets/images/icons/sun-logo.svg";
import { ReactComponent as ReminderLogo } from "../../assets/images/icons/reminder-logo.svg";
import { ReactComponent as DueDateLogo } from "../../assets/images/icons/due-date.svg";
import { ReactComponent as RecurringLogo } from "../../assets/images/icons/recurring-logo.svg";
import { ReactComponent as CategoryLogo } from "../../assets/images/icons/category-logo.svg";
import { ReactComponent as AddFileLogo } from "../../assets/images/icons/add-file-logo.svg";
import { ReactComponent as HideLogo } from "../../assets/images/icons/hide-logo.svg";
import { ReactComponent as DeleteLogo } from "../../assets/images/icons/delete-logo.svg";
import { ReactComponent as LaterTodayLogo } from "../../assets/images/icons/later-today-logo.svg";
import { ReactComponent as TomorrowLogo } from "../../assets/images/icons/tomorrow-logo.svg";
import { ReactComponent as NextWeekLogo } from "../../assets/images/icons/next-week-logo.svg";
import { ReactComponent as TodayCalendarLogo } from "../../assets/images/icons/today-calendar-logo.svg";
import { ReactComponent as TomorrowClendarLogo } from "../../assets/images/icons/tomorrow-clendar-logo.svg";
import { ReactComponent as NextWeeksLogo } from "../../assets/images/icons/next-week.svg";
import { ReactComponent as DailyRepaetLogo } from "../../assets/images/icons/daily-repaet.svg";
import { ReactComponent as WeekdaysRepeatLogo } from "../../assets/images/icons/weekdays-repaet.svg";
import { ReactComponent as WeeklyRepeatLogo } from "../../assets/images/icons/weekly-repaet.svg";
import { ReactComponent as MonthlyRepeatLogo } from "../../assets/images/icons/monthly-repaet.svg";
import { ReactComponent as YearlyRepaetLogo } from "../../assets/images/icons/yearly-repaet.svg";




const TodoDetails = () => {
  return (
    <div className="todo-details todo-details--open">
      <div className="container h-100 detail-flex">
        <div className="details-top">
          <div className="task detail-task">
            <span className="new-task-top__circle" />
            <p className="task__content">Lorem ipsum dolor sit amet.</p>
            <span className="task__isImportant">
              <StarLogo fill="#0078d7" width="18px" height="18px" />
            </span>
          </div>
          <div className="details-wrapper">
            <div className="new-task-top new-step">
              <PlusLogo />
              <span className="new-task-top__circle hide" />
              <input
                type="text"
                placeholder="Add step"
                className="new-task-top__input"
              />
            </div>
            <div className="add-toDay">
              <span className="add-toDay__icon">
                <SunLogo />
              </span>
              <p className="add-toDay__title">Add to My Day</p>
            </div>
            <div className="options">
              <div className="details-option p-relative">
                <div className="details-option__top">
                  <span className="details-option__icon">
                    <ReminderLogo />
                  </span>
                  <p className="details-option__title">Remind me</p>
                </div>
                <div className="details-date-option">
                  <h4 className="details-date-option__title">Reminder</h4>
                  <ul className="date-option-menu">
                    <li className="date-option-menu__item">
                      <div className="date-option-menu__left">
                        <LaterTodayLogo />
                        <span className="date-option-menu__title">
                          Later today
                        </span>
                      </div>
                      <span className="date-option-menu__day">5:00 PM</span>
                    </li>
                    <li className="date-option-menu__item">
                      <div className="date-option-menu__left">
                        <TomorrowLogo />
                        <span className="date-option-menu__title">
                          Tomorrow
                        </span>
                      </div>
                      <span className="date-option-menu__day">Fri, 9 AM</span>
                    </li>
                    <li className="date-option-menu__item">
                      <div className="date-option-menu__left">
                        <NextWeekLogo />
                        <span className="date-option-menu__title">
                          Next week
                        </span>
                      </div>
                      <span className="date-option-menu__day">Mon, 9 AM</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="details-option p-relative">
                <div className="details-option__top">
                  <span className="details-option__icon">
                    <DueDateLogo />
                  </span>
                  <p className="details-option__title">Add due date</p>
                </div>
                <div className="details-date-option">
                  <h4 className="details-date-option__title">Due</h4>
                  <ul className="date-option-menu">
                    <li className="date-option-menu__item">
                      <div className="date-option-menu__left">
                        <TodayCalendarLogo />
                        <span className="date-option-menu__title">Today</span>
                      </div>
                      <span className="date-option-menu__day">Thu</span>
                    </li>
                    <li className="date-option-menu__item">
                      <div className="date-option-menu__left">
                        <TomorrowClendarLogo />
                        <span className="date-option-menu__title">
                          Tomorrow
                        </span>
                      </div>
                      <span className="date-option-menu__day">Fri</span>
                    </li>
                    <li className="date-option-menu__item">
                      <div className="date-option-menu__left">
                        <NextWeeksLogo />
                        <span className="date-option-menu__title">
                          Next week
                        </span>
                      </div>
                      <span className="date-option-menu__day">Mon</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="details-option p-relative">
                <div className="details-option__top">
                  <span className="details-option__icon">
                    <RecurringLogo />
                  </span>
                  <p className="details-option__title">Repeat</p>
                </div>
                <div
                  className="details-date-option "
                  style={{ top: "auto", bottom: "-2rem" }}
                >
                  <h4 className="details-date-option__title">Repaet</h4>
                  <ul className="date-option-menu">
                    <li className="date-option-menu__item">
                      <div className="date-option-menu__left">
                        <DailyRepaetLogo />
                        <span className="date-option-menu__title">Daily</span>
                      </div>
                    </li>
                    <li className="date-option-menu__item">
                      <div className="date-option-menu__left">
                        <WeekdaysRepeatLogo />
                        <span className="date-option-menu__title">
                          Weekdays
                        </span>
                      </div>
                    </li>
                    <li className="date-option-menu__item">
                      <div className="date-option-menu__left">
                        <WeeklyRepeatLogo />
                        <span className="date-option-menu__title">Weekly</span>
                      </div>
                    </li>
                    <li className="date-option-menu__item">
                      <div className="date-option-menu__left">
                        <MonthlyRepeatLogo />
                        <span className="date-option-menu__title">Monthly</span>
                      </div>
                    </li>
                    <li className="date-option-menu__item">
                      <div className="date-option-menu__left">
                        <YearlyRepaetLogo />
                        <span className="date-option-menu__title">Yearly</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="details-category">
              <span className="details-category__icon">
                <CategoryLogo />
              </span>
              <p className="details-category__title">Pick a category</p>
            </div>
            <div className="add-file">
              <span className="add-file__icon">
                <AddFileLogo />
              </span>
              <p className="add-file__title">Add file</p>
            </div>
            <div className="add-note">
              <textarea
                className="add-note__textarea"
                placeholder="Add note"
                defaultValue={""}
              />
            </div>
          </div>
        </div>
        <div className="todo-details__bottom">
          <Link to="/tasks/inbox">
              <span className="todo-details__hide">
                <HideLogo />
              </span>
          </Link>
          <span className="todo-details__date">
            Created on Sat, September 3
          </span>
          <span className="todo-details__delete">
            <DeleteLogo />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoDetails;
