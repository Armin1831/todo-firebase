import React from 'react';
import { Outlet } from 'react-router-dom'
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
    return (
        <>
            <Header/>
            <div className="app">
                <Sidebar/>
                <Outlet/>
                <div className="cover"></div>
            </div>
        </>
    );
};

export default Layout;
