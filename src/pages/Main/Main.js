import React, {useContext, useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {userContext} from "../../context/userContext";
import "./Main.css";

// components
import MainHeader from "../../components/MainHeader/MainHeader";
import NewTask from "../../components/NewTask/NewTask";
import CompletedHead from "../../components/CompletedHead/CompletedHead";
import TasksList from "../../components/TasksList/TasksList";
import useCollection from "../../hooks/useCollection";


const Main = () => {
    const [openCompletedTasks, setOpenCompletedTasks] = useState(false);
    const [completedTasks, setCompletedTasks] = useState([]);
    const {user: {user}} = useContext(userContext);
    const {docs, error} = useCollection("tasks",
        ["userCreator", "==", user.uid], ["constructionTime", "desc"]);

    useEffect(() => {
        const completedTasks = docs.filter((task) => task.isCompleted)
        setCompletedTasks(completedTasks)
    }, [docs]);

    return (
        <>
            <main className="main">
                <MainHeader/>
                <NewTask/>
                {error && (
                    <div className="container">
                        <div className="error">Unable to receive data</div>
                    </div>
                )}
                {docs.length > 0 &&
                    <div className="all-tasks">
                        <section className="tasks">
                            <div className="container">
                                <TasksList tasks={docs}/>
                            </div>
                        </section>
                        {completedTasks.length > 0 &&
                            <section className="completed-tasks">
                                <div className="container">
                                    <CompletedHead
                                        toggleTasks={setOpenCompletedTasks}
                                        openCompletedTasks={openCompletedTasks}
                                        num={completedTasks.length}
                                    />
                                    <div
                                        className={openCompletedTasks ? "completed-tasks-wrapper completed-tasks-wrapper--show"
                                            : "completed-tasks-wrapper"}
                                    >
                                        <TasksList tasks={completedTasks}/>
                                    </div>
                                </div>
                            </section>}
                    </div>}
            </main>
            <Outlet/>
        </>
    );
};

export default Main;
