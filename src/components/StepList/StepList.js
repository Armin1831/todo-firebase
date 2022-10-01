import React from 'react';
import useFirestore from "../../hooks/useFirestore";
import "./StepList.css"
// components
import Step from "../Step/Step";


const StepList = ({steps, id: taskId}) => {
    const {updateDocument} = useFirestore("tasks");

    const deleteStep = async (id) => {
        await updateDocument(taskId, {
            steps: steps.filter((step) => step.createdAt !== id)
        })
    }
    const completeStep = async (id) => {
        const newSteps = steps.map((step) => {
            if (Number(step.createdAt) === Number(id)) {
                console.log(step)
                return {
                    ...step,
                    isCompleted: !step.isCompleted
                }
            }

            return {...step};
        })
        await updateDocument(taskId, {
            steps: newSteps
        })
    }
    return (
        <div>
            {
                steps.map(step => <Step key={step.createdAt} step={step} completeStep={() => completeStep(step.createdAt)}
                                        deleteStep={() => deleteStep(step.createdAt)}/>)
            }
        </div>
    );
};

export default StepList;
