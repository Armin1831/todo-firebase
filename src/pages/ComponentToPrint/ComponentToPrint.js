import React from 'react';
import {myDate} from "../../utils/dateOptionsUtils";
import "./ComponentToPrint.css"

// icons
import {ReactComponent as DoneLogo} from "../../assets/images/icons/done-svgrepo-com.svg";
import {ReactComponent as RecurringLogo} from "../../assets/images/icons/recurring-logo.svg";
import {ReactComponent as ReminderLogo} from "../../assets/images/icons/reminder-logo.svg";
import {ReactComponent as DueDateLogo} from "../../assets/images/icons/due-date.svg";
import {ReactComponent as SunLogo} from "../../assets/images/icons/sun-logo.svg";
import {ReactComponent as AddFileLogo} from "../../assets/images/icons/add-file-logo.svg";
import {ReactComponent as NoteLogo} from "../../assets/images/icons/note-logo.svg";
import {ReactComponent as StarFillLogo} from "../../assets/images/icons/starFill.svg";
import {ReactComponent as StarLogo} from "../../assets/images/icons/star-logo.svg";


const ComponentToPrint = React.forwardRef((props, ref) => {
    const {name, logo: Logo, tasks} = props

    return (
        <div className="print-area container" ref={ref}>
            <section className="todo-header" style={{marginBottom:"1rem"}}>
                <div className="container">
                    <div className="main-header">
                        <div className="main-header_left">
                            {Logo &&
                                <span
                                    className="main-header_menu-logo "
                                >
                                    <Logo style={{color: "#3f3e3e", width: "24px", height: "24px"}}/>
                                </span>
                            }
                            <h2 className="main-header_title ">{name}</h2>
                        </div>
                    </div>
                </div>
            </section >
            <div className="tasks-wrapper-print" >
                {tasks.map((task) => {
                    return (
                        <div className="task" style={{display: "flex"}}>
                            {task.isCompleted ?
                                <span><DoneLogo/></span> :
                                <span className="new-task-top__circle"/>
                            }
                            <div style={{width: "100%"}}>
                                <div className="task-info" style={{width: "100%"}}>
                                    <p className="task__content">{task.text}</p>
                                    <div  style={{display: "flex"}}>
                                        {task.steps.length > 0 &&
                                            <span className="task-info__steps">
                                                {task.steps.filter(step => step.isCompleted).length} of {task.steps.length}
                                            </span>
                                        }
                                        {task.repeat !== "" &&
                                            <span className="task-info__steps">
                                                <RecurringLogo style={{width: "16px", height: "16px"}}/>
                                                {task.repeat}
                                            </span>
                                        }
                                        {task.reminder !== "" &&
                                            <span className="task-info__steps">
                                                <ReminderLogo style={{width: "16px", height: "16px"}}/>
                                                {task.reminder !== "" ?
                                                    task.reminder.toDate().getDay() === myDate.date.getDay() + 1 ?
                                                        "Tomorrow" :
                                                        task.reminder.toDate().getDate() === myDate.date.getDate() ?
                                                            "Today" : task.reminder.toDate().toDateString() : null}
                                            </span>
                                        }
                                        {task.dueDate !== "" &&
                                            <span className="task-info__steps">
                                                <DueDateLogo style={{width: "16px", height: "16px"}}/>
                                                {task.dueDate !== "" ?
                                                    task.dueDate.toDate().getDay() === myDate.date.getDay() + 1 ?
                                                        "Tomorrow" : task.dueDate.toDate().getDate() === myDate.date.getDate() ?
                                                            "Today" : task.dueDate.toDate().toDateString()
                                                    : null}
                                            </span>
                                        }
                                        {task.isInMyDay &&
                                            <span className="task-info__steps">
                                                <SunLogo style={{width: "16px", height: "16px"}}/>
                                                My Day
                                            </span>
                                        }
                                        {task.categories.length > 0 &&
                                            task.categories.map(category => (
                                                <span
                                                    key={category.name}
                                                    className="task-info__steps" style={{color: category.color}}>
                                                    <span className="task-info__category"
                                                          style={{
                                                              backgroundColor: category.color,
                                                              borderColor: category.backgroundColor
                                                          }}
                                                    />
                                                    {category.name}
                                                </span>
                                            ))
                                        }
                                        {task.file.name !== "" &&
                                            <span className="task-info__steps">
                                                <AddFileLogo style={{width: "16px", height: "16px"}}/>
                                                File attached
                                            </span>
                                        }
                                        {task.note !== "" &&
                                            <span className="task-info__steps">
                                                <NoteLogo style={{width: "16px", height: "16px"}}/>
                                                Note
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>
                            <span className="task__isImportant">
                                {task.isImportant ? <StarFillLogo/> : <StarLogo/>}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
})

export default ComponentToPrint;
