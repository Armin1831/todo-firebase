import React, {useContext, useEffect, useState} from "react";
import {useParams, Outlet, useNavigate} from "react-router-dom";
import {tasksContext} from "../../context/tasksContext";
import {UiContext} from "../../context/uiContext";
import {listsContext} from "../../context/listsContext";
import {getLogo, getTitle, getCompleteAndNotCompleteTasks, getSortedTasks} from "./utils"
import "./Main.css";

// components
import MainHeader from "../../components/MainHeader/MainHeader";
import NewTask from "../../components/NewTask/NewTask";
import CompletedHead from "../../components/CompletedHead/CompletedHead";
import TasksList from "../../components/TasksList/TasksList";

// icons
import {ReactComponent as SidebarLogo} from "../../assets/images/icons/new-lists-logo.svg";
import {ReactComponent as CloseLogo} from "../../assets/images/icons/close-logo.svg";


const Main = () => {
    const {tasksListId} = useParams();
    const {tasks, error} = useContext(tasksContext);
    const {notInitialLists, initialLists} = useContext(listsContext);
    const {uiState: {isLeftSidebarOpen}, uiStateHandler} = useContext(UiContext);
    const [openCompletedTasks, setOpenCompletedTasks] = useState(false);
    const [sortOption, setSortOption] = useState({});
    const [completedTasks, setCompletedTasks] = useState([]);
    const [notCompletedTasks, setNotCompletedTasks] = useState([]);
    const navigate = useNavigate();
    const list = [...initialLists, ...notInitialLists].find(list => list.id === tasksListId);


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
        if (list) {
            const {notCompletedTasks, completedTasks} =
                getCompleteAndNotCompleteTasks(tasks, list.id);
            if (sortOption !== "") {
                const tasks =
                    getSortedTasks([notCompletedTasks, completedTasks], sortOption[list.id])
                setCompletedTasks(tasks[1])
                setNotCompletedTasks(tasks[0])
            }
            setCompletedTasks(completedTasks);
            setNotCompletedTasks(notCompletedTasks);
        }
        !list && navigate("/tasks/inbox")
    }, [tasks, list, sortOption, initialLists, notInitialLists, navigate]);


    return (
        <>
            {
                list &&
                <>
                    <main className="main">
                        <MainHeader
                            name={getTitle(list)}
                            logo={!isLeftSidebarOpen ? SidebarLogo : getLogo(tasksListId)}
                            setSortOption={getSortOption}
                            currentList={list}
                        />
                        {sortOption[tasksListId] &&
                            <div className="container is-sorted">
                                sorted by {sortOption[tasksListId].toLowerCase()}
                                <CloseLogo
                                    onClick={() => setSortOption(prevState => {
                                        return {
                                            ...prevState,
                                            [tasksListId]: null
                                        }
                                    })}
                                    style={{width: "14px", height: "14px", cursor: "pointer"}}
                                />
                            </div>
                        }
                        <NewTask
                            list={list}
                        />
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
            }
        </>
    );
};

export default Main;
