import React, {useContext, useState} from 'react';
import {taskContext} from "../../context/taskContext";
import "./NewStep.css"
import useFirestore from "../../hooks/useFirestore";

//icons
import {ReactComponent as PlusLogo} from "../../assets/images/icons/plus-logo.svg";


const NewStep = () => {
    const {task} = useContext(taskContext)
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
            <PlusLogo onClick={() => addNewStep()}/>
            <span className="new-task-top__circle hide"/>
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
