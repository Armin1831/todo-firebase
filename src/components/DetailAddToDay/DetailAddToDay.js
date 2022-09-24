import React from 'react';
import "./DetailAddToDay.css";

// icons
import {ReactComponent as SunLogo} from "../../assets/images/icons/sun-logo.svg";


const DetailAddToDay = () => {
    return (
        <div className="add-toDay">
            <span className="add-toDay__icon">
                <SunLogo/>
            </span>
            <p className="add-toDay__title">Add to My Day</p>
        </div>
    );
};

export default DetailAddToDay;
