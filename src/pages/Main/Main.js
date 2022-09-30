import React, {useContext, useEffect, useRef, useState} from "react";
import {Outlet, useParams, useNavigate} from "react-router-dom";
import {tasksContext} from "../../context/tasksContext";
import "./Main.css";

// components
import MainHeader from "../../components/MainHeader/MainHeader";
import NewTask from "../../components/NewTask/NewTask";
import CompletedHead from "../../components/CompletedHead/CompletedHead";
import TasksList from "../../components/TasksList/TasksList";

// icons
import {ReactComponent as SidebarLogo} from "../../assets/images/icons/sidebar-logo.svg";
import {ReactComponent as SunLogo} from "../../assets/images/icons/sun-logo.svg";
import {ReactComponent as StarLogo} from "../../assets/images/icons/star-logo.svg";
import {ReactComponent as CalenderLogo} from "../../assets/images/icons/calendar-logo.svg";
import {ReactComponent as PersonLogo} from "../../assets/images/icons/person-logo.svg";
import {ReactComponent as HomeLogo} from "../../assets/images/icons/home-logo.svg";

const Main = () => {
    const {tasksListId} = useParams()
    const {tasks, error} = useContext(tasksContext);
    const [openCompletedTasks, setOpenCompletedTasks] = useState(false);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [notCompletedTasks, setNotCompletedTasks] = useState([]);
    const tasksListRef = useRef(tasksListId);
    const navigate = useNavigate();

    useEffect(() => {
        if (tasksListId !== "id") {
            tasksListRef.current = tasksListId
        } else {
            if (tasksListRef.current === "id" || !tasksListRef.current) {
                navigate("/tasks/inbox")
            }
        }
    }, [tasksListId, navigate]);

    useEffect(() => {
        const completedTasks = []
        const notCompletedTasks = []
        tasks.forEach(task => {
            if (task.lists.includes(tasksListRef.current)) {
                if (task.isCompleted) {
                    completedTasks.push(task)
                } else notCompletedTasks.push(task)
            }
        })
        setCompletedTasks(completedTasks)
        setNotCompletedTasks(notCompletedTasks)
    }, [tasks, tasksListId]);

    const getLogo = (list) => {
        switch (list) {
            case "inbox":
                return HomeLogo;
            case "assigned_to_me":
                return PersonLogo;
            case "planned":
                return CalenderLogo;
            case "important":
                return StarLogo;
            case "my_day":
                return SunLogo;
            default:
                return SidebarLogo;
        }
    };

    return (
        <>
            <main className="main">
                <MainHeader
                    name={tasksListRef.current.replaceAll("_", " ")[0].toUpperCase()
                        + tasksListRef.current.replaceAll("_", " ").slice(1)}
                    logo={getLogo(tasksListId)}
                />
                <NewTask list={tasksListRef.current}/>
                {error && (
                    <div className="container">
                        <div className="error">Unable to receive data</div>
                    </div>
                )}
                {tasks.length > 0 &&
                    <div className="all-tasks">
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
