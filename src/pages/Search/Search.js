import React, {useContext, useEffect, useState} from 'react'
import {tasksContext} from "../../context/tasksContext";
import {getSearchedTasks} from "../Main/utils";

// components
import MainHeader from "../../components/MainHeader/MainHeader";
import TasksList from "../../components/TasksList/TasksList";
import CompletedHead from "../../components/CompletedHead/CompletedHead";


// icons
import {Outlet, useParams} from "react-router-dom";


const Search = () => {
    const {search} = useParams();
    const {tasks, error} = useContext(tasksContext);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [notCompletedTasks, setNotCompletedTasks] = useState([]);
    const [openCompletedTasks, setOpenCompletedTasks] = useState(false);




    useEffect(() => {
        const {notCompletedTasks, completedTasks} =
            getSearchedTasks(tasks, search);
        setCompletedTasks(completedTasks)
        setNotCompletedTasks(notCompletedTasks)
    }, [tasks,  search]);


    return (
        <>
            <main className="main">
                <MainHeader
                    name={`Searching for "${ search ?  search : " "}"`}
                    currentList={null}
                    hideOptions={true}
                />
                {error && (
                    <div className="container">
                        <div className="error">Unable to receive data</div>
                    </div>
                )}
                {(tasks.length > 0 &&  search) &&
                    <div
                        className="all-tasks"
                        style={{paddingTop: "2.5rem"}}
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
                }
            </main>
            <Outlet/>
        </>
    );
};

export default Search;
