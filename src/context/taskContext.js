import React, {createContext} from 'react';
import {Outlet, useParams} from "react-router-dom";
import useDocument from "../hooks/useDocument";


const initialState = {
    task: {},
    error: ""
}
export const taskContext = createContext(initialState);


const useTaskContext = () => {
    const {taskId} = useParams();
    const {data: task, error} = useDocument("tasks", taskId)


    return (
        <taskContext.Provider
            value={{task, error}}
        >
            <Outlet/>
        </taskContext.Provider>
    );
};

export default useTaskContext;