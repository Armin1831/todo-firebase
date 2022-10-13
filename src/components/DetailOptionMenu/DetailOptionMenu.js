import React, {forwardRef, useState} from 'react';
import DatePicker from "react-datepicker";
import "./DetailOptionMenu.css";

// icons
import {ReactComponent as RightArrowLogo} from "../../assets/images/icons/right-arrow.svg";
import {ReactComponent as CustomDateLogo} from "../../assets/images/icons/custom-date-logo.svg";


const DetailOptionMenu = ({title, menuOptions, updateSomeDates, showDatePicker = true, ...props}) => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div {...props}>
            <h4 className="details-date-option__title">{title}</h4>
            <ul className="date-option-menu">
                {
                    menuOptions.map((menuOption, index) => {
                        const Logo = menuOption.logo
                        return (
                            <li className="date-option-menu__item" key={index}
                                onClick={() => updateSomeDates(menuOption.timeObject ?
                                    menuOption.timeObject : menuOption.title)}
                            >
                                <div className="date-option-menu__left">
                                    <Logo/>
                                    <span className="date-option-menu__title">{menuOption.title}</span>
                                </div>
                                {menuOption.value && <span className="date-option-menu__day">{menuOption.value}</span>}
                            </li>
                        )
                    })
                }
            </ul>
            {showDatePicker &&
                <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date)
                        updateSomeDates(date, false)
                    }}
                    shouldCloseOnSelect={false}
                    customInput={<ExampleCustomInput/>}
                />
            }
        </div>
    );
};

export default DetailOptionMenu;


const ExampleCustomInput = forwardRef(({onClick}, ref) => (
    <li
        ref={ref}
        onClick={onClick}
        className="date-option-menu__item date-option-menu__lastItem"
    >
        <div className="date-option-menu__left">
            <CustomDateLogo/>
            <span className="date-option-menu__title">Pick a date &amp; time</span>
        </div>
        <RightArrowLogo style={{width: "16px", height: "16px"}}/>
    </li>
));