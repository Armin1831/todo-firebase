import React, {useContext} from "react";
import {UiContext} from "../../context/uiContext";
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

    return (
        <div className={ uiState.isLeftSidebarOpen ? "sidebar sidebar--open" : "sidebar"}>
            <div className="sidebar__head">
                <span className="sidebar__logo" onClick={() => uiStateHandler("isLeftSidebarOpen")}>
                  <SidebarLogo/>
                </span>
            </div>
            <ul className="sidebar-menu">
                <SidebarLink
                    title="My Day"
                    path="/tasks/my-day"
                    count="1"
                    logo={<SunLogo/>}
                />
                <SidebarLink
                    title="Important"
                    path="/tasks/important"
                    count="1"
                    logo={<StarLogo style={{color:"#4b4c4d"}}/>}
                />
                <SidebarLink
                    title="Planned"
                    path="/tasks/planned"
                    count="1"
                    logo={<CalenderLogo/>}
                />
                <SidebarLink
                    title="Assigned To Me"
                    path="/tasks/assigned-to-me"
                    count="1"
                    logo={<PersonLogo/>}
                />
                <SidebarLink
                    title="Tasks"
                    path="/tasks/inbox"
                    count="1"
                    logo={<HomeLogo/>}
                />
            </ul>
            <div className="line-wrapper sidebar__line">
                <span className="completed-head__line"/>
            </div>
            <div className="new-list" >
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
