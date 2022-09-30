import React, {createContext, useContext, useEffect, useState} from 'react';
import useCollection from "../hooks/useCollection";
import {userContext} from "./userContext";
import {Outlet} from "react-router-dom";


const initialState = {
    tasksCount: {
        "inbox": 0,
        "my_day": 0,
        "important": 0,
        "planned": 0,
        "assigned_to_me": 0
    }
}
export const tasksContext = createContext(initialState);


const useTasksContext = () => {
    const {user: {user}} = useContext(userContext);
    const {docs: tasks, error} = useCollection("tasks",
        ["userCreator", "==", user.uid]);
    const [tasksCount, setTasksCount] = useState({
        "inbox": 0,
        "my_day": 0,
        "important": 0,
        "planned": 0,
        "assigned_to_me": 0
    });
    useEffect(() => {
        const getAllTasksCount = (tasks) => {
            let initialTasksCount = {
                "inbox": 0,
                "my_day": 0,
                "important": 0,
                "planned": 0,
                "assigned_to_me": 0
            }
            if (tasks.length === 0) {
                setTasksCount(initialTasksCount)
                return;
            }
            tasks.forEach(task => {
                task.lists.forEach(list => {
                    initialTasksCount[list] += 1
                })
            })
            setTasksCount(initialTasksCount)
        }
        if (tasks.length >= 0) {
            getAllTasksCount(tasks)
        }
    }, [tasks]);

    return (
        <tasksContext.Provider
            value={{tasksCount, tasks, error}}
        >
            <Outlet/>
        </tasksContext.Provider>
    );
};

export default useTasksContext;