import React from 'react';
import "./DetailOptionHead.css";

// icons
import {ReactComponent as CloseLogo} from "../../assets/images/icons/close-logo.svg";


const DetailOptionHead = ({hours, day, logo: Logo, openInformationMenu, updateSomeDates}) => {
    const isHaveDate = hours !== "Add Due Date" && hours !== "Remind My" && hours !== "Repeat"

    return (
        <div className="details-option__topWrapper" >
            <div className="details-option__top" onClick={openInformationMenu}>
                <span className="details-option__icon">
                    <Logo style={{color: isHaveDate ? "var(--primary-color)" : "#797775"}}/>
                </span>
                {day ?
                    <div className="details-option__title">
                        <p className="details-option__hours">{hours}</p>
                        <p className="details-option__day">{day}</p>
                    </div>
                    : <p className="details-option__hours"
                         style={{color: isHaveDate ? "var(--primary-color)" : "#797775"}}>{hours}</p>}

            </div>

            {isHaveDate &&
                <span className="details-option__icon" style={{marginLeft: "auto"}}
                      onClick={() => updateSomeDates(null)}>
                    <CloseLogo style={{color: "#797775", width: "12px", height: "12px"}}/>
                </span>
            }
        </div>
    );
};

export default DetailOptionHead;
