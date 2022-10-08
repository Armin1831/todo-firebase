import React, {useContext, useEffect, useRef} from 'react';
import {Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import {UiContext} from "../../context/uiContext";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import TodoDetails from "../../pages/TodoDetails/TodoDetails";
import TaskContext from "../../context/taskContext";
import Main from "../../pages/Main/Main";
import Search from "../../pages/Search/Search";


const Layout = () => {
    const {uiState, uiStateHandler} = useContext(UiContext);
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const pathRef = useRef(pathname);

    useEffect(() => {
        if (!pathname.includes("id")) {
            pathRef.current = pathname
        }
    }, [pathname]);

    const handleCoverClick = (e) => {
        if (e.target.classList.contains("cover--show")) {
            if (uiState.isLeftSidebarOpen) {
                uiStateHandler("isLeftSidebarOpen")
            }
            if (pathname.includes("id")) {
                navigate(-1)
            }
        }
    }


    return (
        <>
            <Header/>
            <div className="app">
                <Sidebar/>
                <Routes>
                    <Route index element={<Navigate to="inbox" replace/>}/>
                    <Route path="search">
                        <Route index element={<Search/>}/>
                        <Route path=":search/*" element={<Search/>}>
                            <Route path="id">
                                <Route index element={<Navigate to="/tasks/inbox" replace/>}/>
                                <Route path=":taskId" element={<TaskContext/>}>
                                    <Route index element={<TodoDetails path={pathRef.current}/>}/>
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                    <Route path=":tasksListId/*" element={<Main/>}>
                        <Route path="id">
                            <Route index element={<Navigate to="/tasks/inbox" replace/>}/>
                            <Route path=":taskId" element={<TaskContext/>}>
                                <Route index element={<TodoDetails path={pathRef.current}/>}/>
                            </Route>
                        </Route>
                    </Route>
                </Routes>
                <div
                    className={uiState.isLeftSidebarOpen || pathname.includes("id") ?
                        "cover cover--show" : "cover"}
                    onClick={handleCoverClick}
                />
            </div>
        </>
    );
};

export default Layout;
