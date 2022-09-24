import React from 'react';
import "./DetailOptionHead.css";


const DetailOptionHead = ({title, logo, openInformationMenu, menuName}) => {
    return (
        <div className="details-option__top"
             onClick={() => openInformationMenu(menuName)}>
            <span className="details-option__icon">
                {logo}
            </span>
            <p className="details-option__title">{title}</p>
        </div>
    );
};

export default DetailOptionHead;
