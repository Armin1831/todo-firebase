import React from 'react';

import "./NewTask.css"
//icons
import {ReactComponent as PlusLogo} from "../../assets/images/icons/plus-logo.svg";
import {ReactComponent as CalendarLogo} from "../../assets/images/icons/calendar-logo.svg";
import {ReactComponent as ReminderLogo} from "../../assets/images/icons/reminder-logo.svg";
import {ReactComponent as RecurringLogo} from "../../assets/images/icons/recurring-logo.svg";

const NewTask = () => {
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
                        />
                    </div>
                    <div className="new-task-bottom">
                        <div className="new-task-bottom__options">
                                  <span className="new-task-bottom__icon">
                                    <CalendarLogo/>
                                  </span>
                            <span className="new-task-bottom__icon">
                                    <ReminderLogo/>
                                  </span>
                            <span className="new-task-bottom__icon">
                                    <RecurringLogo/>
                                  </span>
                        </div>
                        <button className="new-task-bottom__add">Add</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewTask;
