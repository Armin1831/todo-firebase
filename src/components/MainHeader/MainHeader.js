import React, {useContext} from 'react';
import {UiContext} from "../../context/uiContext";
import "./MainHeader.css"

// components
import OutsideHandler from "../../hooks/useOutsideHandler";

// icons
import {ReactComponent as SortLogo} from "../../assets/images/icons/sort-logo.svg";
import ListOptions from "../ListOptions/ListOptions";
import SortOptions from "../SortOptions/SortOptions";


const MainHeader = (
    {
        name,
        logo: Logo,
        setSortOption,
        hideOptions = false,
        currentList,
        handlePrint
    }) =>
{
    const {uiState, uiStateHandler} = useContext(UiContext);

    return (
        <section className="todo-header">
            <div className="container">
                <div className="main-header">
                    <div className="main-header_left">
                        {Logo &&
                            <span
                                className="main-header_menu-logo "
                                onClick={() => uiStateHandler("isLeftSidebarOpen")}
                            >
                                <Logo style={{color: "#3f3e3e", width: "24px", height: "24px"}}/>
                            </span>
                        }
                        <h2 className="main-header_title ">{name}</h2>
                        {!hideOptions &&
                            <OutsideHandler uiState={uiState} uiStateHandler={uiStateHandler}>
                                <div className="list-option print-display-none">
                                    <div className="logo-wrapper"
                                         onClick={() => uiStateHandler("isListOptionsOpen")}
                                    >...
                                    </div>
                                    <ListOptions
                                        className={uiState.isListOptionsOpen ?
                                            "list-menu list-menu--show" : "list-menu"}
                                        currentList={currentList}
                                        handlePrint={handlePrint}
                                    />
                                </div>
                            </OutsideHandler>
                        }
                    </div>
                    {!hideOptions &&
                        <OutsideHandler uiState={uiState} uiStateHandler={uiStateHandler}>
                            <div className="main-header_right print-display-none">
                                <div className="sort"
                                     onClick={() => uiStateHandler("isSortMenuOpen")}
                                >
                                    <SortLogo/>
                                    <span className="main-header_sort">Sort</span>
                                </div>
                                <SortOptions
                                    className={uiState.isSortMenuOpen ?
                                        "sort-menu sort-menu--show" : "sort-menu"}
                                    setSortOption={setSortOption}
                                />
                            </div>
                        </OutsideHandler>
                    }
                </div>
            </div>
        </section>
    );
};

export default MainHeader;
