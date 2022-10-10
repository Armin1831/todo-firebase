import React, {useContext} from 'react';
import "./ListOptions.css";

// components

// icons
import {ReactComponent as PaintingCanvasLogo} from "../../assets/images/icons/painting-canvas.svg";
import {ReactComponent as RightArrowLogo} from "../../assets/images/icons/right-arrow.svg";
import {ReactComponent as PrintLogo} from "../../assets/images/icons/print-logo.svg";
import {ReactComponent as DeleteLogo} from "../../assets/images/icons/delete-logo.svg";
import useFirestore from "../../hooks/useFirestore";
import {tasksContext} from "../../context/tasksContext";
import {UiContext} from "../../context/uiContext";


const ListOptions = ({className, currentList, handlePrint}) => {
    const {deleteDocument} = useFirestore("lists");
    const {deleteMultipleDocuments} = useFirestore("tasks");
    const {uiStateHandler} = useContext(UiContext);
    const {tasks} = useContext(tasksContext);

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
    return (
        <div id="listMenu" className={className}>
            <h4 className="list-menu_title">list options</h4>
            <ul className="menu-option">
                <li className="menu-option_items">
                    <PaintingCanvasLogo/>
                    <span className="menu-option_title">Change theme</span>
                    <RightArrowLogo/>
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
