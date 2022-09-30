import React, {useContext, useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {UiContext} from "../../context/uiContext";
import {tasksContext} from "../../context/tasksContext";
import "./Sidebar.css";

// components
import SidebarLink from "../Sidebar-Link/SidebarLink";

// icons
import {ReactComponent as SidebarLogo} from "../../assets/images/icons/sidebar-logo.svg";
import {ReactComponent as SunLogo} from "../../assets/images/icons/sun-logo.svg";
import {ReactComponent as StarLogo} from "../../assets/images/icons/star-logo.svg";
import {ReactComponent as CalenderLogo} from "../../assets/images/icons/calendar-logo.svg";
import {ReactComponent as PersonLogo} from "../../assets/images/icons/person-logo.svg";
import {ReactComponent as HomeLogo} from "../../assets/images/icons/home-logo.svg";
import {ReactComponent as PlusLogo} from "../../assets/images/icons/plus-logo.svg";
import {ReactComponent as NewListLogo} from "../../assets/images/icons/new-list.svg";


const Sidebar = () => {
    const {uiState, uiStateHandler} = useContext(UiContext);
    const {tasksCount} = useContext(tasksContext);
    const location = useLocation();
    const locationRef = useRef(location.pathname);
    const allPath = useRef([
        "/tasks/my_day",
        "/tasks/important",
        "/tasks/planned",
        "/tasks/assigned_to_me",
        "/tasks/inbox"
    ]);
    const [activeLinks, setActiveLinks] = useState({
        "my_day": false,
        "important": false,
        "planned": false,
        "assigned_to_me": false,
        "inbox": false
    });


    useEffect(() => {
        if (!(new RegExp("id")).test(location.pathname)) {
            locationRef.current = location.pathname
        }
        const chengActiveLink = (link) => {
            setActiveLinks({
                myDay: false,
                important: false,
                planned: false,
                assignedToMe: false,
                inbox: false,
                [link]: true
            })
        }
        allPath.current.forEach(path => {
            if ((new RegExp(path)).test(location.pathname) || (new RegExp(path)).test(locationRef.current)) {
                chengActiveLink(path.slice(7))
            }
        })
    }, [location.pathname]);


    return (
        <div className={uiState.isLeftSidebarOpen ? "sidebar sidebar--open" : "sidebar"}>
            <div className="sidebar__head">
                <span className="sidebar__logo" onClick={() => uiStateHandler("isLeftSidebarOpen")}>
                    <SidebarLogo/>
                </span>
            </div>
            <ul className="sidebar-menu">
                <SidebarLink
                    title="My Day"
                    path="/tasks/my_day"
                    count={tasksCount.my_day}
                    logo={<SunLogo/>}
                    active={activeLinks}
                />
                <SidebarLink
                    title="Important"
                    path="/tasks/important"
                    count={tasksCount.important}
                    logo={<StarLogo style={{color: "#4b4c4d"}}/>}
                    active={activeLinks}
                />
                <SidebarLink
                    title="Planned"
                    path="/tasks/planned"
                    count={tasksCount.planned}
                    logo={<CalenderLogo/>}
                    active={activeLinks}
                />
                <SidebarLink
                    title="Assigned To Me"
                    path="/tasks/assigned_to_me"
                    count={tasksCount.assigned_to_me}
                    logo={<PersonLogo/>}
                    active={activeLinks}
                />
                <SidebarLink
                    title="Tasks"
                    path="/tasks/inbox"
                    count={tasksCount.inbox}
                    logo={<HomeLogo/>}
                    active={activeLinks}
                />
            </ul>
            <div className="line-wrapper sidebar__line">
                <span className="completed-head__line"/>
            </div>
            <div className="new-list">
                <div className="new-list__wrapper">
                    <span className="new-list__new">
                        <PlusLogo/>
                    </span>
                    <input
                        type="text"
                        placeholder="New List"
                        className="new-list__input"
                    />
                </div>
                <span className="new-list__group">
                    <NewListLogo/>
                </span>
            </div>
        </div>
    );
};

export default Sidebar;
