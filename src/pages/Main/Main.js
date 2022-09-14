import React from "react";
import {Outlet} from "react-router-dom";
import "./Main.css";

// components
import MainHeader from "../../components/MainHeader/MainHeader";
import NewTask from "../../components/NewTask/NewTask";
import Task from "../../components/Task/Task";
import CompletedHead from "../../components/CompletedHead/CompletedHead";


// icons


const Main = () => {


    return (
        <>
            <main className="main">
                <MainHeader/>
                <NewTask/>
                <div className="all-tasks">
                    <section className="tasks">
                        <div className="container">
                            <div className="tasks-wrapper">
                                <Task/>
                                <Task/>
                            </div>
                        </div>
                    </section>
                    <section className="completed-tasks">
                        <div className="container">
                            <CompletedHead/>
                            <div className="tasks-wrapper completed-tasks-wrapper">
                                <Task/>
                                <Task/>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Outlet/>
        </>
    );
};

export default Main;
