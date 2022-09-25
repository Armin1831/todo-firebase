import React, {useContext} from 'react';
import {Navigate, Outlet, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import {UiContext} from "../../context/uiContext";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import TodoDetails from "../../pages/TodoDetails/TodoDetails";

const Layout = () => {
    const {uiState, uiStateHandler} = useContext(UiContext);
    const location = useLocation()
    const navigate = useNavigate()
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
    return (
        <>
            <Header/>
            <div className="app">
                <Sidebar/>
                <Outlet/>
                <Routes>
                    <Route path="id">
                        <Route index element={<Navigate to="/tasks/inbox" replace/>}/>
                        <Route path=":taskId" element={<TodoDetails/>}/>
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
