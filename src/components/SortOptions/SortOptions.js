import React from 'react';
import "./SortOptions.css";

// icons
import {ReactComponent as StarLogo} from "../../assets/images/icons/star-logo.svg";
import {ReactComponent as DueDateLogo} from "../../assets/images/icons/due-date.svg";
import {ReactComponent as SunLogo} from "../../assets/images/icons/sun-logo.svg";
import {ReactComponent as SortLogo} from "../../assets/images/icons/sort-logo.svg";
import {ReactComponent as CreationDateLogo} from "../../assets/images/icons/creation-date.svg";


const SortOptions = ({...props}) => {
    return (
        <div id="sortMenu" {...props}>
            <h4 className="sort-menu__title">Sort by</h4>
            <ul className="sort-options">
                <li className="sort-options__item">
                    <StarLogo style={{color: "black"}}/>
                    <span className="sort-options__title">Importance</span>
                </li>
                <li className="sort-options__item">
                    <DueDateLogo style={{color: "black"}}/>
                    <span className="sort-options__title">Due date</span>
                </li>
                <li className="sort-options__item">
                    <SunLogo style={{color: "black"}}/>
                    <span className="sort-options__title">Added to My Day</span>
                </li>
                <li className="sort-options__item">
                    <SortLogo style={{color: "black"}}/>
                    <span className="sort-options__title">Alphabetically</span>
                </li>
                <li className="sort-options__item">
                    <CreationDateLogo style={{color: "black"}}/>
                    <span className="sort-options__title">Creation date</span>
                </li>
            </ul>
        </div>
    );
};

export default SortOptions;