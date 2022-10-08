import React, {useContext, useEffect, useState} from "react";
import {useParams, Outlet} from "react-router-dom";
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
    const {tasksListId} = useParams();
    const {tasks, error} = useContext(tasksContext);
    const {uiState: {isLeftSidebarOpen}, uiStateHandler} = useContext(UiContext);
    const [openCompletedTasks, setOpenCompletedTasks] = useState(false);
    const [sortOption, setSortOption] = useState({});
    const [completedTasks, setCompletedTasks] = useState([]);
    const [notCompletedTasks, setNotCompletedTasks] = useState([]);


    const getSortOption = (sortOption) => {
        setSortOption(prevState => {
            return {
                ...prevState,
                [tasksListId]: sortOption
            }
        })
        uiStateHandler("isSortMenuOpen")
    }




    useEffect(() => {
        const {notCompletedTasks, completedTasks} =
            getCompleteAndNotCompleteTasks(tasks, tasksListId);
        if (sortOption !== "") {
            const [notACompletedTasks, completedATasks] =
                getSortedTasks([notCompletedTasks, completedTasks], sortOption[tasksListId])
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
                    name={getTitle(tasksListId)}
                    logo={!isLeftSidebarOpen ? SidebarLogo : getLogo(tasksListId)}
                    setSortOption={getSortOption}
                />
                <NewTask list={tasksListId}/>
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
                            </section>
                        }
                    </div>
                }
            </main>
            <Outlet/>
        </>
    );
};

export default Main;
