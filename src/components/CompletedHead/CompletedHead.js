import React from 'react';
import "./CompletedHead.css";

//icons
import {ReactComponent as RightArrowLogo} from "../../assets/images/icons/right-arrow.svg";


const CompletedHead = () => {
    return (
        <div className="completed-head-wrapper">
            <div className="completed-head">
                <RightArrowLogo className="completed-head__icon"/>
                <span className="completed-head__text">Completed</span>
                <span className="completed-head__count">3</span>
            </div>
            <div className="line-wrapper completed-tasks__line">
                <span className="completed-head__line"/>
            </div>
        </div>
    );
};

export default CompletedHead;
