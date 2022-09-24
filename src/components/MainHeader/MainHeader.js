import React, {useContext} from 'react';
import "./MainHeader.css"

// components
import OutsideHandler from "../../hooks/useOutsideHandler";

// icons
import {ReactComponent as SidebarLogo} from "../../assets/images/icons/sidebar-logo.svg";
import {ReactComponent as SortLogo} from "../../assets/images/icons/sort-logo.svg";
import ListOptions from "../ListOptions/ListOptions";
import SortOptions from "../SortOptions/SortOptions";
import {UiContext} from "../../context/uiContext";


const MainHeader = () => {
    const {uiState, uiStateHandler} = useContext(UiContext);
    return (
        <section className="todo-header">
            <div className="container">
                <div className="main-header">
                    <div className="main-header_left">
                        <span className="main-header_menu-logo" onClick={() => uiStateHandler("isLeftSidebarOpen")}>
                            <SidebarLogo/>
                        </span>
                        <h2 className="main-header_title">Tasks</h2>
                        <OutsideHandler uiState={uiState} uiStateHandler={uiStateHandler}>
                            <div className="list-option">
                                <div className="logo-wrapper"
                                     onClick={() => uiStateHandler("isListOptionsOpen")}
                                >...
                                </div>
                                <ListOptions
                                    className={uiState.isListOptionsOpen ? "list-menu list-menu--show" : "list-menu"}/>
                            </div>
                        </OutsideHandler>
                    </div>
                    <OutsideHandler uiState={uiState} uiStateHandler={uiStateHandler}>
                        <div className="main-header_right">
                            <div className="sort"
                                 onClick={() => uiStateHandler("isSortMenuOpen")}
                            >
                                <SortLogo/>
                                <span className="main-header_sort">Sort</span>
                            </div>
                            <SortOptions
                                className={uiState.isSortMenuOpen ? "sort-menu sort-menu--show" : "sort-menu"}/>
                        </div>
                    </OutsideHandler>
                </div>
            </div>
        </section>
    );
};

export default MainHeader;
