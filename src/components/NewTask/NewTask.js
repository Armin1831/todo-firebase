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
                    <button className="new-task__add">Add</button>
                </div>
            </div>
        </section>
    );
};

export default NewTask;
