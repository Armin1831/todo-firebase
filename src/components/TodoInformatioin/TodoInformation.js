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



const TodoInformation = () => {
    return (
        <div className="details-wrapper">
            <div className="steps">
                <StepList/>
                <NewStep/>
            </div>
            <DetailAddToDay/>
            <DetailOptions/>
            <DetailCategory/>
            <DetailsAddFile/>
            <DetailAddNote/>
        </div>
    );
};

export default TodoInformation;
