import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import "./Main.css";

// components
import MainHeader from "../../components/MainHeader/MainHeader";
import NewTask from "../../components/NewTask/NewTask";
import CompletedHead from "../../components/CompletedHead/CompletedHead";
import TasksList from "../../components/TasksList/TasksList";


// icons


const Main = () => {
    const [openCompletedTasks, setOpenCompletedTasks] = useState(false)

    return (
        <>
            <main className="main">
                <MainHeader/>
                <NewTask/>
                <div className="all-tasks">
                    <section className="tasks">
                        <div className="container">
                            <TasksList/>
                        </div>
                    </section>
                    <section className="completed-tasks">
                        <div className="container">
                            <CompletedHead toggleTasks={setOpenCompletedTasks} openCompletedTasks={openCompletedTasks}/>
                            <div
                                className={openCompletedTasks ? "completed-tasks-wrapper completed-tasks-wrapper--show"
                                    : "completed-tasks-wrapper"}
                            >
                                <TasksList/>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Outlet/>
        </>
    );
};

export default Main;
