import React, {useContext} from 'react';
import {UiContext} from "../../context/uiContext";
import "./MainHeader.css"
// icons
import {ReactComponent as SidebarLogo} from "../../assets/images/icons/sidebar-logo.svg";
import {ReactComponent as PaintingCanvasLogo} from "../../assets/images/icons/painting-canvas.svg";
import {ReactComponent as RightArrowLogo} from "../../assets/images/icons/right-arrow.svg";
import {ReactComponent as PrintLogo} from "../../assets/images/icons/print-logo.svg";
import {ReactComponent as SortLogo} from "../../assets/images/icons/sort-logo.svg";
import {ReactComponent as StarLogo} from "../../assets/images/icons/star-logo.svg";
import {ReactComponent as DueDateLogo} from "../../assets/images/icons/due-date.svg";
import {ReactComponent as SunLogo} from "../../assets/images/icons/sun-logo.svg";
import {ReactComponent as CreationDateLogo} from "../../assets/images/icons/creation-date.svg";


const MainHeader = () => {
    const {toggleSortMenu, toggleSidebar, toggleListOption, state} = useContext(UiContext);

    return (<section className="todo-header">
        <div className="container">
            <div className="main-header">
                <div className="main-header_left">
                <span className="main-header_menu-logo" onClick={() => toggleSidebar()}>
                  <SidebarLogo/>
                </span>
                    <h2 className="main-header_title">Tasks</h2>
                    <div className="list-option">
                        <div className="logo-wrapper"
                             onClick={() => toggleListOption()}
                        >...
                        </div>
                        <div className={state.isListOptionsOpen ? "list-menu list-menu--show" : "list-menu"}
                             id="listMenu">
                            <h4 className="list-menu_title">list options</h4>
                            <ul className="menu-option">
                                <li className="menu-option_items">
                                    <PaintingCanvasLogo/>
                                    <span className="menu-option_title">Change theme</span>
                                    <RightArrowLogo/>
                                </li>
                                <li className="menu-option_items">
                                    <PrintLogo/>
                                    <span className="menu-option_title">Print list</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="main-header_right">
                    <div className="sort"
                         onClick={() => toggleSortMenu()}
                    >
                        <SortLogo/>
                        <span className="main-header_sort">Sort</span>
                    </div>
                    <div className={state.isSortMenuOpen ? "sort-menu sort-menu--show" : "sort-menu"} id="sortMenu">
                        <h4 className="sort-menu__title">Sort by</h4>
                        <ul className="sort-options">
                            <li className="sort-options__item">
                                <StarLogo/>
                                <span className="sort-options__title">Importance</span>
                            </li>
                            <li className="sort-options__item">
                                <DueDateLogo/>
                                <span className="sort-options__title">Due date</span>
                            </li>
                            <li className="sort-options__item">
                                <SunLogo/>
                                <span className="sort-options__title">Added to My Day</span>
                            </li>
                            <li className="sort-options__item">
                                <SortLogo style={{color: "black !important", fill: "black"}}/>
                                <span className="sort-options__title">Alphabetically</span>
                            </li>
                            <li className="sort-options__item">
                                <CreationDateLogo/>
                                <span className="sort-options__title">Creation date</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>);
};

export default MainHeader;
