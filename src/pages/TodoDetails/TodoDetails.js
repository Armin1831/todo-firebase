import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import useFirestore from "../../hooks/useFirestore";
import {taskContext} from "../../context/taskContext";
import {storage} from "../../firebase/firebase.config";
import {ref, deleteObject} from "firebase/storage";
import "./TodoDetails.css";

// components
import Task from "../../components/Task/Task";
import TodoInformation from "../../components/TodoInformatioin/TodoInformation";

// icons
import {ReactComponent as HideLogo} from "../../assets/images/icons/hide-logo.svg";
import {ReactComponent as DeleteLogo} from "../../assets/images/icons/delete-logo.svg";


const TodoDetails = ({path}) => {
    const navigate = useNavigate();
    const {task, error} = useContext(taskContext)
    const {deleteDocument} = useFirestore("tasks");

    const handleDeleteTodo = async () => {
        navigate(path)
        try {
            if (task.file.name !== "") {
                const fileRef = ref(storage, `tasksFiles/${task.userCreator}/${task.id}/${task.file.name}`);
                await deleteObject(fileRef)
            }
            await deleteDocument(task.id)
        } catch (e) {
            alert("delete task filed")
        }
    }

    return (
        <div className="todo-details">
            {error && <div className="error">{error}</div>}
            {task &&
                <div className="container h-100 detail-flex">
                    <div className="details-top">
                        <Task className="task detail-task" task={task}/>
                        <TodoInformation/>
                    </div>
                    <div className="todo-details__bottom">
                        <span className="todo-details__hide"
                              onClick={() => navigate(path)}
                        >
                            <HideLogo/>
                        </span>
                        <span className="todo-details__date">
                            Created At {new Date(task.constructionTime).toDateString()}
                        </span>
                        <span className="todo-details__delete" onClick={handleDeleteTodo}>
                            <DeleteLogo/>
                        </span>
                    </div>
                </div>
            }

        </div>
    );
};

export default TodoDetails;
