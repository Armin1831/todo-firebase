import React from "react";
import "./SidebarLink.css";
import {Link} from "react-router-dom";


const SidebarLink = ({title, path, count, logo, active}) => {

    return (
        <Link
            to={path}
        >
            <div className={
                active[path.slice(7)]
                    ? "sidebar-menu__item--active sidebar-menu__item"
                    : "sidebar-menu__item"
            }
            >
                <div className="sidebar-menu__content">
                    {logo}
                    <span className="sidebar-menu__title">{title}</span>
                </div>
                <span className="sidebar-menu__number">{count !== 0 && count}</span>
            </div>
        </Link>
    );
};

export default SidebarLink;
