import React from 'react';
import "./Step.css";


// icons
import {ReactComponent as DoneLogo} from "../../assets/images/icons/done-svgrepo-com.svg";
import {ReactComponent as CloseLogo} from "../../assets/images/icons/close-logo.svg";


const Step = ({step, deleteStep , completeStep}) => {


    return (
        <>
            {Step &&
                <div className="task detail-task">
                    {step.isCompleted ?
                        <span onClick={() => completeStep(step)}><DoneLogo/></span> :
                        <span className="new-task-top__circle" onClick={completeStep}/>
                    }
                    <p className="task__content">{step.text}</p>
                    <span className="task__isImportant" onClick={deleteStep}>
                        <CloseLogo style={{color: "#605e5c", fill: "#605e5c", width: "14px", height: "14pxf"}}/>
                    </span>
                </div>
            }
        </>
    );
};

export default Step;
