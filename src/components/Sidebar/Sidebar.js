import React, {useContext} from "react";
import {UiContext} from "../../context/uiContext";
import {tasksContext} from "../../context/tasksContext";
import {listsContext} from "../../context/listsContext";
import "./Sidebar.css";

// components
import SidebarLink from "../Sidebar-Link/SidebarLink";
import NewList from "../NewList/NewList";

// icons
import {ReactComponent as SidebarLogo} from "../../assets/images/icons/sidebar-logo.svg";
import {ReactComponent as SunLogo} from "../../assets/images/icons/sun-logo.svg";
import {ReactComponent as StarLogo} from "../../assets/images/icons/star-logo.svg";
import {ReactComponent as CalenderLogo} from "../../assets/images/icons/calendar-logo.svg";
import {ReactComponent as PersonLogo} from "../../assets/images/icons/person-logo.svg";
import {ReactComponent as HomeLogo} from "../../assets/images/icons/home-logo.svg";
import {ReactComponent as NewListsLogo} from "../../assets/images/icons/new-lists-logo.svg";


const Sidebar = () => {
    const {uiState, uiStateHandler} = useContext(UiContext);
    const {tasksCount} = useContext(tasksContext);
    const {notInitialLists} = useContext(listsContext);


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
                />
                <SidebarLink
                    title="Important"
                    path="/tasks/important"
                    count={tasksCount.important}
                    logo={<StarLogo style={{color: "#4b4c4d"}}/>}
                />
                <SidebarLink
                    title="Planned"
                    path="/tasks/planned"
                    count={tasksCount.planned}
                    logo={<CalenderLogo/>}
                />
                <SidebarLink
                    title="Assigned To Me"
                    path="/tasks/assigned_to_me"
                    count={tasksCount.assigned_to_me}
                    logo={<PersonLogo/>}
                />
                <SidebarLink
                    title="Tasks"
                    path="/tasks/inbox"
                    count={tasksCount.inbox}
                    logo={<HomeLogo/>}
                />
            </ul>
            <div className="line-wrapper sidebar__line">
                <span className="completed-head__line"/>
            </div>
            <ul className="sidebar-lists">
                {
                    notInitialLists.length > 0 && notInitialLists.map(list => {
                        return (
                            <SidebarLink
                                key={list.id}
                                title={list.name}
                                path={`/tasks/${list.id}`}
                                count={tasksCount[list.id]}
                                logo={<NewListsLogo/>}
                            />
                        )
                    })
                }
            </ul>
            <NewList/>
        </div>
    );
};

export default Sidebar;
