import React, {useContext, useEffect, useRef, useState} from "react";
import {Outlet, useParams, useNavigate} from "react-router-dom";
import {tasksContext} from "../../context/tasksContext";
import {UiContext} from "../../context/uiContext";
import {getLogo, getTitle, getCompleteAndNotCompleteTasks, getSortedTasks} from "./utils"
import "./Main.css";

// components
import MainHeader from "../../components/MainHeader/MainHeader";
import NewTask from "../../components/NewTask/NewTask";
import CompletedHead from "../../components/CompletedHead/CompletedHead";
import TasksList from "../../components/TasksList/TasksList";

// icons
import {ReactComponent as SidebarLogo} from "../../assets/images/icons/sidebar-logo.svg";

const Main = () => {
    const {tasksListId} = useParams()
    const {tasks, error} = useContext(tasksContext);
    const {uiState: {isLeftSidebarOpen}, uiStateHandler} = useContext(UiContext);
    const [openCompletedTasks, setOpenCompletedTasks] = useState(false);
    const [sortOption, setSortOption] = useState({});
    const [completedTasks, setCompletedTasks] = useState([]);
    const [notCompletedTasks, setNotCompletedTasks] = useState([]);
    const tasksListRef = useRef(tasksListId);
    const navigate = useNavigate();

    const getSortOption = (sortOption) => {
        setSortOption(prevState => {
            return {
                ...prevState,
                [tasksListRef.current]: sortOption
            }
        })
        uiStateHandler("isSortMenuOpen")
    }

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
        const {notCompletedTasks, completedTasks} =
            getCompleteAndNotCompleteTasks(tasks, tasksListRef.current);
        if (sortOption !== "") {
            const [notACompletedTasks, completedATasks] =
                getSortedTasks([notCompletedTasks, completedTasks], sortOption[tasksListRef.current])
            setCompletedTasks(completedATasks)
            setNotCompletedTasks(notACompletedTasks)
        }
        setCompletedTasks(completedTasks)
        setNotCompletedTasks(notCompletedTasks)
    }, [tasks, tasksListId, sortOption]);


    return (
        <>
            <main className="main">
                <MainHeader
                    name={getTitle(tasksListRef.current)}
                    logo={!isLeftSidebarOpen ? SidebarLogo : getLogo(tasksListId)}
                    setSortOption={getSortOption}
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
