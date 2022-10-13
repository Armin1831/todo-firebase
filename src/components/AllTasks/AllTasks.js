import React, {useState} from 'react';

// components
import TasksList from "../TasksList/TasksList";
import CompletedHead from "../CompletedHead/CompletedHead";

const AllTasks = ({notCompletedTasks,completedTasks}) => {
    const [openCompletedTasks, setOpenCompletedTasks] = useState(false);

    return (
        <div
            className="all-tasks"
        >
            {notCompletedTasks.length > 0 &&
                <section className="tasks">
                    <div className="container">
                        <TasksList tasks={notCompletedTasks}/>
                    </div>
                </section>
            }
            {completedTasks.length > 0 &&
                <section className="completed-tasks">
                    <div className="container">
                        <CompletedHead
                            toggleTasks={setOpenCompletedTasks}
                            openCompletedTasks={openCompletedTasks}
                            num={completedTasks.length}
                        />
                        <div
                            className={openCompletedTasks ?
                                "completed-tasks-wrapper completed-tasks-wrapper--show"
                                : "completed-tasks-wrapper"}
                        >
                            <TasksList tasks={completedTasks}/>
                        </div>
                    </div>
                </section>
            }
        </div>
    );
};

export default AllTasks;
