import React from 'react';
import "./NewStep.css"
import {ReactComponent as PlusLogo} from "../../assets/images/icons/plus-logo.svg";


const NewStep = () => {
    return (
        <div className="new-task-top new-step">
            <PlusLogo/>
            <span className="new-task-top__circle hide"/>
            <input
                type="text"
                placeholder="Add step"
                className="new-task-top__input"
            />
        </div>
    );
};

export default NewStep;
