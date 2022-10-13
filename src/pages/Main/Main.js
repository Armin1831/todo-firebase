import React, {useContext, useState, useRef, useMemo} from "react";
import {useParams, Outlet, useNavigate} from "react-router-dom";
import {tasksContext} from "../../context/tasksContext";
import {listsContext} from "../../context/listsContext";
import {getTitle, getCompleteAndNotCompleteTasks, getSortedTasks} from "./utils";
import {useReactToPrint} from 'react-to-print';
import "./Main.css";

// components
import MainHeader from "../../components/MainHeader/MainHeader";
import NewTask from "../../components/NewTask/NewTask";


// icons
import SortedOption from "../../components/SortedOption/SortedOption";
import AllTasks from "../../components/AllTasks/AllTasks";


const Main = () => {
    const {tasksListId} = useParams();
    const {tasks, error} = useContext(tasksContext);
    const {notInitialLists, initialLists} = useContext(listsContext);
    const [sortOption, setSortOption] = useState({});
    const navigate = useNavigate();

    const list = [...initialLists, ...notInitialLists].find(list => list.id === tasksListId);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    const {notCompletedTasks, completedTasks} = useMemo(() => {
        if (tasks.length === 0 || !list) {
            !list && navigate("/tasks/inbox")
            return {
                notCompletedTasks: [],
                completedTasks: []
            }
        }
        if (list) {
            const {notCompletedTasks, completedTasks} =
                getCompleteAndNotCompleteTasks(tasks, list.id);
            if (sortOption !== "") {
                const tasks =
                    getSortedTasks([notCompletedTasks, completedTasks], sortOption[list.id])
                return {
                    notCompletedTasks: tasks[0],
                    completedTasks: tasks[1]
                }
            }
            return {
                notCompletedTasks,
                completedTasks
            }
        }
    }, [tasks, list, sortOption, navigate]);


    return (
        <>
            {
                list &&
                <>
                    <main className="main print-area" ref={componentRef}>
                        <MainHeader
                            name={getTitle(list)}
                            setSortOption={setSortOption}
                            currentList={list}
                            handlePrint={handlePrint}
                        />
                        {sortOption[tasksListId] &&
                            <SortedOption
                                sortedBy={sortOption[tasksListId].toLowerCase()}
                                setSortOption={setSortOption}
                                list={list}
                            />
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
                            <AllTasks
                                notCompletedTasks={notCompletedTasks}
                                completedTasks={completedTasks}
                            />
                        }
                    </main>
                    <Outlet/>
                </>
            }
        </>
    );
};

export default Main;
