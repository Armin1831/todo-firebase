import React, {useContext, useEffect, useRef} from 'react';
import {Navigate, Outlet, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import {UiContext} from "../../context/uiContext";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import TodoDetails from "../../pages/TodoDetails/TodoDetails";
import TaskContext from "../../context/taskContext";


const Layout = () => {
    const {uiState, uiStateHandler} = useContext(UiContext);
    const location = useLocation()
    const navigate = useNavigate()
    const tasksListRef = useRef(location.pathname);

    const handleCoverClick = (e) => {
        if (e.target.classList.contains("cover--show")) {
            if (uiState.isLeftSidebarOpen) {
                uiStateHandler("isLeftSidebarOpen")
            }
            if (location.pathname.includes("id")) {
                navigate(-1)
            }
        }
    }


    useEffect(() => {
        if (!location.pathname.includes("id")) {
            tasksListRef.current = location.pathname
        }
    }, [location.pathname]);

    return (
        <>
            <Header/>
            <div className="app">
                <Sidebar/>
                <Outlet/>
                <Routes>
                    <Route path="id">
                        <Route index element={<Navigate to="/tasks/inbox" replace/>}/>
                        <Route path=":taskId" element={<TaskContext/>}>
                            <Route index element={<TodoDetails path={tasksListRef.current}/>}/>
                        </Route>
                    </Route>
                </Routes>
                <div
                    className={uiState.isLeftSidebarOpen || location.pathname.includes("id") ?
                        "cover cover--show" : "cover"}
                    onClick={handleCoverClick}
                ></div>
            </div>
        </>
    );
};

export default Layout;
