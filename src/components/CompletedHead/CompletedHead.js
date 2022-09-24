import React from 'react';
import "./CompletedHead.css";

//icons
import {ReactComponent as RightArrowLogo} from "../../assets/images/icons/right-arrow.svg";


const CompletedHead = ({toggleTasks, openCompletedTasks}) => {
    const handleToggleTasks = () => {
        toggleTasks((prev) => (!prev))
    }


    return (
        <div className="completed-head-wrapper" onClick={handleToggleTasks}>
            <div className="completed-head">
                <RightArrowLogo
                    className={openCompletedTasks ? "completed-head__icon completed-head__icon--open" : "completed-head__icon"}/>
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
