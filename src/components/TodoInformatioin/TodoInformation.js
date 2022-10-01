import React from 'react';
import "./TodoInformation.css";

// components
import NewStep from "../NewStep/NewStep";
import DetailCategory from "../DetailCategory/DetailsCategory";
import DetailsAddFile from "../DetailAddFile/DetailsAddFile";
import DetailAddNote from "../DetailAddNote/DetailAddNote";
import DetailAddToDay from "../DetailAddToDay/DetailAddToDay";
import DetailOptions from "../DetailOptions/DetailOptions";
import StepList from "../StepList/StepList";


const TodoInformation = ({task}) => {


    return (
        <div className="details-wrapper">
            <StepList id={task.id} steps={task.steps}/>
            <NewStep task={task}/>
            <DetailAddToDay/>
            <DetailOptions/>
            <DetailCategory/>
            <DetailsAddFile/>
            <DetailAddNote/>
        </div>
    );
};

export default TodoInformation;
