import React, {useContext, useState} from 'react';
import {taskContext} from "../../context/taskContext";
import {colorContext} from "../../context/colorContext";
import useFirestore from "../../hooks/useFirestore";
import "./NewStep.css"

//icons
import {ReactComponent as PlusLogo} from "../../assets/images/icons/plus-logo.svg";


const NewStep = () => {
    const {task} = useContext(taskContext);
    const {currentColor} = useContext(colorContext);
    const [step, setStep] = useState("");
    const {updateDocument} = useFirestore("tasks");

    const addNewStep = async () => {
        if (step !== "") {
            setStep("")
            await updateDocument(task.id, {
                steps: [...task.steps, {
                    createdAt: new Date().getTime(),
                    text: step,
                    isCompleted: false
                }]
            })
        }
    }

    return (
        <div className="new-task-top new-step">
            <PlusLogo style={{color: currentColor}} onClick={() => addNewStep()}/>
            <span
                className="new-task-top__circle hide"
                style={{color: currentColor}}
            />
            <input
                type="text"
                placeholder={task.steps.length ? "Next step" : "Add step"}
                className="new-task-top__input"
                onChange={(e) => setStep(e.target.value)}
                value={step}
                onKeyDown={(e) => e.key === "Enter" && addNewStep()}
            />
        </div>
    );
};

export default NewStep;
