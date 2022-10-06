import React, {useContext} from 'react';
import {taskContext} from "../../context/taskContext";
import useFirestore from "../../hooks/useFirestore";
import "./StepList.css"

// components
import Step from "../Step/Step";


const StepList = () => {
    const {task} = useContext(taskContext)
    const {updateDocument} = useFirestore("tasks");

    const deleteStep = async (id) => {
        await updateDocument(task.id, {
            steps: task.steps.filter((step) => step.createdAt !== id)
        })
    }

    const completeStep = async (id) => {
        const newSteps = task.steps.map((step) => {
            if (Number(step.createdAt) === Number(id)) {
                return {
                    ...step,
                    isCompleted: !step.isCompleted
                }
            }

            return {...step};
        })
        await updateDocument(task.id, {
            steps: newSteps
        })
    }

    return (
        <div>
            {
                task.steps.map(step =>
                    <Step
                        key={step.createdAt} step={step}
                        completeStep={completeStep}
                        deleteStep={deleteStep}
                    />
                )
            }
        </div>
    );
};

export default StepList;
