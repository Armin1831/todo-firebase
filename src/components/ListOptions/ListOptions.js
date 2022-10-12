import React, {useContext, useEffect, useState} from 'react';
import useFirestore from "../../hooks/useFirestore";
import {tasksContext} from "../../context/tasksContext";
import {UiContext} from "../../context/uiContext";
import {colorContext} from "../../context/colorContext";
import "./ListOptions.css";

// components

// icons
import {ReactComponent as PaintingCanvasLogo} from "../../assets/images/icons/painting-canvas.svg";
import {ReactComponent as RightArrowLogo} from "../../assets/images/icons/right-arrow.svg";
import {ReactComponent as PrintLogo} from "../../assets/images/icons/print-logo.svg";
import {ReactComponent as DeleteLogo} from "../../assets/images/icons/delete-logo.svg";
import {ReactComponent as DoneLogo} from "../../assets/images/icons/done-svgrepo-com.svg";

const colors = [
    {
        bg: "linear-gradient(to bottom left, #765ee6, #1c9fff)",
        color: "#2564cf"
    },
    {
        bg: "linear-gradient(to bottom left, #e84f53, #ebbd94)",
        color: "#d2534e"
    },
    {
        bg: "linear-gradient(to bottom left, #954db0, #7159f0)",
        color: "#7a45bf"
    },
    {
        bg: "linear-gradient(to bottom left, #51a03e, #aadf5d)",
        color: "#5ca52d"
    },
    {
        bg: "linear-gradient(to bottom left, #558deb, #53d2e5)",
        color: "#228be8"
    }
];


const ListOptions = ({className, currentList, handlePrint}) => {
    const {deleteDocument} = useFirestore("lists");
    const {deleteMultipleDocuments} = useFirestore("tasks");
    const {uiStateHandler} = useContext(UiContext);
    const {tasks} = useContext(tasksContext);
    const {currentColor, handleSetColor: setCurrentColor} = useContext(colorContext);
    const [openColorPicker, setOpenColorPicker] = useState(false);


    useEffect(() => {
        const initialValue = localStorage.getItem("listColor");
        const color = JSON.parse(initialValue) && JSON.parse(initialValue)[currentList.id]
        setCurrentColor(color || "#2564cf")
    }, [currentList.id]);

    const canDelete = currentList.id !== "inbox" &&
        currentList.id !== "assigned_to_me" &&
        currentList.id !== "planned" &&
        currentList.id !== "important" &&
        currentList.id !== "my_day"

    const handleDeleteList = async () => {
        uiStateHandler("isListOptionsOpen")
        const currentTasks = tasks.filter(task => task.lists.includes(currentList.id))
        await deleteMultipleDocuments(currentTasks)
        await deleteDocument(currentList.id)
    }

    const handlePrintList = () => {
        uiStateHandler("isListOptionsOpen")
        handlePrint()
    }

    const handlePickColor = (color) => {
        setCurrentColor(color)
        const initialValue = localStorage.getItem("listColor");
        const prevColor = JSON.parse(initialValue) || {}
        prevColor[currentList.id] = color
        localStorage.setItem("listColor", JSON.stringify(prevColor))
        uiStateHandler("isListOptionsOpen")
        setOpenColorPicker(false)
    }

    return (
        <div id="listMenu" className={className}>
            <h4 className="list-menu_title">list options</h4>
            <ul className="menu-option">
                <li className="menu-option_items p-relative">
                    <div
                        onClick={() => setOpenColorPicker(!openColorPicker)}
                        className="menu-option__colors"
                    >
                        <PaintingCanvasLogo/>
                        <span className="menu-option_title">Change theme</span>
                        <RightArrowLogo/>
                    </div>
                    <div className={openColorPicker ? "pick-color pick-color--show" : "pick-color"}>
                        {
                            colors.map(color => (
                                <div
                                    key={color.bg}
                                    className="pick-color__items"
                                    style={{backgroundImage: color.bg}}
                                    onClick={() => handlePickColor(color.color)}
                                >
                                    {currentColor === color.color &&
                                        <DoneLogo
                                            style={{color: "black"}}
                                        />
                                    }
                                </div>
                            ))
                        }
                    </div>
                </li>
                <li className="menu-option_items"
                    onClick={handlePrintList}
                >
                    <PrintLogo/>
                    <span className="menu-option_title">Print list</span>
                </li>
                {canDelete &&
                    <li className="menu-option_items"
                        onClick={handleDeleteList}
                    >
                        <DeleteLogo/>
                        <span className="menu-option_title">Delete list</span>
                    </li>
                }
            </ul>
        </div>
    );
};

export default ListOptions;
