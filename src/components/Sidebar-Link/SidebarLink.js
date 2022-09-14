import React from "react";
import "./SidebarLink.css";
import { NavLink } from "react-router-dom";


const SidebarLink = ({ title, path, count, logo }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? "sidebar-menu__item--active sidebar-menu__item"
          : "sidebar-menu__item"
      }
    >
      <div className="sidebar-menu__content">
        {logo}
        <span className="sidebar-menu__title">{title}</span>
      </div>
      <span className="sidebar-menu__number">{count}</span>
    </NavLink>
  );
};

export default SidebarLink;
