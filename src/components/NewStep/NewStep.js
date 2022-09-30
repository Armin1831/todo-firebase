import React, {useState} from 'react';
import {Timestamp} from "firebase/firestore";
import "./NewStep.css"
import useFirestore from "../../hooks/useFirestore";

//icons
import {ReactComponent as PlusLogo} from "../../assets/images/icons/plus-logo.svg";


const NewStep = ({task}) => {
    const [step, setStep] = useState("");
    const {updateDocument} = useFirestore("tasks");
    const addNewStep = async () => {
        if (step !== "") {
            setStep("")
            await updateDocument(task.id, {
                steps: [...task.steps, {
                    createdAt: Timestamp.fromDate(new Date()),
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
