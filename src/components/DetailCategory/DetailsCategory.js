import React, {useState} from 'react';
import OutsideHandler from "../../hooks/useOutsideHandler";
import "./DetailsCategory.css";

// icons
import {ReactComponent as CategoryLogo} from "../../assets/images/icons/category-logo.svg";

const categoryOptions = [
    {
        name: "Blue category",
        backgroundColor: "rgb(224, 247, 253)",
        color: "blue"
    },
    {
        name: "Purple category",
        backgroundColor: "rgb(125, 87, 178)",
        color: "purple"
    },
    {
        name: "Red category",
        backgroundColor: "rgb(252, 233, 234)",
        color: "red"
    },
    {
        name: "Green category",
        backgroundColor: "rgb(233, 249, 232)",
        color: "green"
    },
    {
        name: "Orange category",
        backgroundColor: "rgb(255, 241, 224)",
        color: "orange"
    },
    {
        name: "Yellow category",
        backgroundColor: "rgb(255, 253, 224)",
        color: "yellow"
    },
];


const DetailCategory = () => {
    const [categoryOptionsOpen, setCategoryOptionsOpen] = useState(false);

    const openCategory = () => {
        setCategoryOptionsOpen(!categoryOptionsOpen)
    }

    return (
        <OutsideHandler openCategory={openCategory}>
            <div className="details-category p-relative" onClick={openCategory}>
                <span className="details-category__icon">
                    <CategoryLogo/>
                </span>
                <p className="details-category__title">Pick a category</p>
                <div
                    className={categoryOptionsOpen ?
                        "details-category__options--show details-category__options" : "details-category__options"}
                >
                    <ul className="category-list">
                        {
                            categoryOptions.map((categoryOption, index) => {
                                return (
                                    <li className="category-list__item"
                                        key={index}>
                                        <span className="category-list__icon"
                                              style={{backgroundColor: categoryOption.color}}
                                        />
                                        <p className="category-list__title"
                                           style={{color: categoryOption.color}}
                                        >{categoryOption.name}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </OutsideHandler>
    );
};

export default DetailCategory;
