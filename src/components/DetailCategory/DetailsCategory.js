import React, {useContext, useState} from 'react';
import OutsideHandler from "../../hooks/useOutsideHandler";
import {arrayUnion, arrayRemove} from "firebase/firestore";
import useFirestore from "../../hooks/useFirestore";
import {taskContext} from "../../context/taskContext";
import "./DetailsCategory.css";

// icons
import {ReactComponent as CategoryLogo} from "../../assets/images/icons/category-logo.svg";
import {ReactComponent as CloseLogo} from "../../assets/images/icons/close-logo.svg";

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
    const {updateDocument} = useFirestore("tasks");
    const {task} = useContext(taskContext)
    const [categoryOptionsOpen, setCategoryOptionsOpen] = useState(false);

    const openCategory = () => {
        setCategoryOptionsOpen(!categoryOptionsOpen)
    }

    const addCategory = async (index) => {
        const newCategory = categoryOptions[index]
        setCategoryOptionsOpen(false)
        await updateDocument(task.id, {
            categories: arrayUnion(newCategory)
        })
    }

    const deleteCategory = async (category) => {
        await updateDocument(task.id, {
            categories: arrayRemove(category)
        })
    }

    return (
        <OutsideHandler openCategory={setCategoryOptionsOpen}>
            <div className="categories">
                {task.categories.length > 0 &&
                    <div className="categories__lent">
                        {task.categories.map(category => (
                            <div className="categories__item"
                                 style={{backgroundColor: category.backgroundColor}}
                                 key={Math.random() * 100}>
                                <span className="categories__title"
                                      style={{color: category.color}}
                                >
                                    {category.name.toLowerCase()}
                                </span>
                                <CloseLogo
                                    style={{color: "#605e5c", width: "12px", height: "12px", cursor: "pointer"}}
                                    onClick={() => deleteCategory(category)}
                                />
                            </div>
                        ))}
                    </div>
                }
                <div className="details-category p-relative">
                    <span className="details-category__icon">
                        <CategoryLogo/>
                    </span>
                    <p className="details-category__title" onClick={openCategory}>Pick a category</p>
                    <div
                        className={categoryOptionsOpen ?
                            "details-category__options--show details-category__options" : "details-category__options"}
                    >
                        <ul className="category-list">
                            {
                                categoryOptions.map((categoryOption, index) => {
                                    return (
                                        <li className="category-list__item"
                                            onClick={() => addCategory(index)}
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
            </div>
        </OutsideHandler>
    );
};

export default DetailCategory;
