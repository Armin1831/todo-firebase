import React, {useContext} from 'react';
import { Outlet } from 'react-router-dom'
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import {UiContext} from "../../context/uiContext";

const Layout = () => {
    const {state} = useContext(UiContext);
    return (
        <>
            <Header/>
            <div className="app">
                <Sidebar/>
                <Outlet/>
                <div className={state.isLeftSidebarOpen || state.isTodoDetailOpen ? "cover cover--show" : "cover"}></div>
            </div>
        </>
    );
};

export default Layout;
