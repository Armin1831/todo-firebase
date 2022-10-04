import React from 'react';
import "./DetailOptionMenu.css";


const DetailOptionMenu = ({title, menuOptions, updateSomeDates}) => {
    return (
        <>
            <h4 className="details-date-option__title">{title}</h4>
            <ul className="date-option-menu">
                {
                    menuOptions.map((menuOption, index) => {
                        const Logo = menuOption.logo
                        return (
                            <li className="date-option-menu__item" key={index}
                                onClick={() => updateSomeDates(menuOption.timeObject ? menuOption.timeObject : menuOption.title)}>
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
        </>
    );
};

export default DetailOptionMenu;
