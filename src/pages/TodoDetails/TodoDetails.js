import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import useFirestore from "../../hooks/useFirestore";
import "./TodoDetails.css";

// components
import Task from "../../components/Task/Task";
import TodoInformation from "../../components/TodoInformatioin/TodoInformation";

// icons
import {ReactComponent as HideLogo} from "../../assets/images/icons/hide-logo.svg";
import {ReactComponent as DeleteLogo} from "../../assets/images/icons/delete-logo.svg";
import useDocument from "../../hooks/useDocument";


const TodoDetails = ({path}) => {
    const navigate = useNavigate();
    const {taskId} = useParams();
    const {data, error} = useDocument("tasks", taskId)
    const {deleteDocument} = useFirestore("tasks");

    const handleDeleteTodo = async (id) => {
        navigate(path)
        await deleteDocument(id)
    }

    return (
        <div className="todo-details">
            {error && <div className="error">{error}</div>}
            {data &&
                <div className="container h-100 detail-flex">
                    <div className="details-top">
                        <Task className="task detail-task" task={data}/>
                        <TodoInformation task={data}/>
                    </div>
                    <div className="todo-details__bottom">
                        <span className="todo-details__hide"
                              onClick={() => navigate(path)}
                        >
                            <HideLogo/>
                        </span>
                        <span className="todo-details__date">
                            Created At {new Date(data.constructionTime).toDateString()}
                        </span>
                        <span className="todo-details__delete" onClick={() => handleDeleteTodo(taskId)}>
                            <DeleteLogo/>
                        </span>
                    </div>
                </div>
            }

        </div>
    );
};

export default TodoDetails;
