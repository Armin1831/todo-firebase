import React, {useContext} from 'react';
import {taskContext} from "../../context/taskContext";
import {arrayRemove, arrayUnion} from "firebase/firestore";
import useFirestore from "../../hooks/useFirestore";
import "./DetailAddToDay.css";

// icons
import {ReactComponent as SunLogo} from "../../assets/images/icons/sun-logo.svg";
import {ReactComponent as CloseLogo} from "../../assets/images/icons/close-logo.svg";


const DetailAddToDay = () => {
    const {task} = useContext(taskContext)
    const {updateDocument} = useFirestore("tasks");

    const addToMyDay = async () => {
        await updateDocument(task.id, {
            isInMyDay: !task.isInMyDay,
            lists: task.isInMyDay ? arrayRemove("my_day") : arrayUnion("my_day")
        })
    }

    return (
        <div className="add-toDay">
            <span className="add-toDay__icon">
                <SunLogo style={{color: task.isInMyDay ? "var(--primary-color)" : ""}}/>
            </span>
            {!task.isInMyDay &&
                <p className="add-toDay__title"
                   style={{cursor:"pointer"}}
                   onClick={addToMyDay}
                >Add to My Day</p>
            }
            {task.isInMyDay &&
                <>
                    <p className="add-toDay__title"

                       style={{color: "var(--primary-color)"}}
                    >Added to My Day</p>
                    <span className="add-toDay__icon" style={{cursor:"pointer"}}
                          onClick={addToMyDay}
                    >
                        <CloseLogo style={{color:"#605e5c",width:"12px",height:"12px"}}/>
                    </span>
                </>
            }

        </div>
    );
};

export default DetailAddToDay;
