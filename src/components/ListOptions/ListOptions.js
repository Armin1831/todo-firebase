import React from 'react';
import "./ListOptions.css";

// components

// icons
import {ReactComponent as PaintingCanvasLogo} from "../../assets/images/icons/painting-canvas.svg";
import {ReactComponent as RightArrowLogo} from "../../assets/images/icons/right-arrow.svg";
import {ReactComponent as PrintLogo} from "../../assets/images/icons/print-logo.svg";


const ListOptions = ({...props}) => {

    return (

        <div id="listMenu" {...props}>
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

    );
};

export default ListOptions;
