import React from 'react';
import "./DetailsCategory.css";

// icons
import {ReactComponent as CategoryLogo} from "../../assets/images/icons/category-logo.svg";


const DetailCategory = () => {
    return (
        <div className="details-category">
            <span className="details-category__icon">
                <CategoryLogo/>
            </span>
            <p className="details-category__title">Pick a category</p>
        </div>
    );
};

export default DetailCategory;
