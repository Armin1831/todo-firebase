import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import useDocument from "../../hooks/useDocument";
import "./TodoDetails.css";

// components
import Task from "../../components/Task/Task";
import TodoInformation from "../../components/TodoInformatioin/TodoInformation";

// icons
import {ReactComponent as HideLogo} from "../../assets/images/icons/hide-logo.svg";
import {ReactComponent as DeleteLogo} from "../../assets/images/icons/delete-logo.svg";


const TodoDetails = () => {
    const navigate = useNavigate();
    const {taskId} = useParams();
    const {deleteDocument} = useDocument("tasks");

    const handleDeleteTodo = async (id) => {
        await deleteDocument(id)
        navigate(-1)
    }
    return (
        <div className="todo-details">
            <div className="container h-100 detail-flex">
                <div className="details-top">
                    <Task className="task detail-task"/>
                    <TodoInformation/>
                </div>
                <div className="todo-details__bottom">
                    <span className="todo-details__hide"
                          onClick={() => navigate(-1)}
                    >
                        <HideLogo/>
                    </span>
                    <span className="todo-details__date">
                        Created By Armin Aboutalebi
                    </span>
                    <span className="todo-details__delete" onClick={() => handleDeleteTodo(taskId)}>
                        <DeleteLogo/>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TodoDetails;
