import React from "react";
import {Link} from "react-router-dom";
import "./TodoDetails.css";

// components
import Task from "../../components/Task/Task";
import TodoInformation from "../../components/TodoInformatioin/TodoInformation";

// icons
import {ReactComponent as HideLogo} from "../../assets/images/icons/hide-logo.svg";
import {ReactComponent as DeleteLogo} from "../../assets/images/icons/delete-logo.svg";


const TodoDetails = () => {

    return (
        <div className="todo-details">
            <div className="container h-100 detail-flex">
                <div className="details-top">
                    <Task className="task detail-task"/>
                    <TodoInformation/>
                </div>
                <div className="todo-details__bottom">
                    <Link to="/tasks/inbox">
                        <span className="todo-details__hide">
                            <HideLogo/>
                        </span>
                    </Link>
                    <span className="todo-details__date">
                        Created By Armin Aboutalebi
                    </span>
                    <span className="todo-details__delete">
                        <DeleteLogo/>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TodoDetails;
