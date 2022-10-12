import React, {useContext} from 'react';
import {colorContext} from "../../context/colorContext";
import "./Step.css";


// icons
import {ReactComponent as DoneLogo} from "../../assets/images/icons/done-svgrepo-com.svg";
import {ReactComponent as CloseLogo} from "../../assets/images/icons/close-logo.svg";


const Step = ({step, deleteStep, completeStep}) => {
    const {currentColor} = useContext(colorContext);


    return (
        <>
            {Step &&
                <div className="step">
                    <div className="step__info">
                        {step.isCompleted ?
                            <span
                                style={{cursor: "pointer"}}
                                onClick={() => completeStep(step.createdAt)}>
                                <DoneLogo style={{color: currentColor}}/>
                            </span> :
                            <span
                                style={{borderColor: currentColor}}
                                className="new-task-top__circle"
                                onClick={() => completeStep(step.createdAt)}/>
                        }
                        <p className="step__content">{step.text}</p>
                        <span className="task__isImportant" onClick={() => deleteStep(step.createdAt)}>
                            <CloseLogo style={{color: "#605e5c", fill: "#605e5c", width: "14px", height: "14pxf"}}/>
                        </span>
                    </div>
                    <span className="step__line"/>
                </div>
            }
        </>
    );
};

export default Step;
