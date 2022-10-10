import React, {useContext, useState} from 'react';
import useFirestore from "../../hooks/useFirestore";
import {userContext} from "../../context/userContext";
import "./NewList.css";


// icons
import {ReactComponent as PlusLogo} from "../../assets/images/icons/plus-logo.svg";
import {ReactComponent as NewListLogo} from "../../assets/images/icons/new-list.svg";



const NewList = () => {
    const [list, setList] = useState("");
    const {createDocument} = useFirestore("lists");
    const {user: {user}} = useContext(userContext);

    const handleCreateNewList = async () => {
        if (list !== "") {
            await createDocument({
                name: list,
                userCreator: user.uid,
                group: ""
            })
            setList("")
        }
    }

    return (
        <div className="new-list">
            <div className="new-list__wrapper">
                <span
                    className="new-list__new"
                    onClick={handleCreateNewList}
                >
                    <PlusLogo/>
                </span>
                <input
                    type="text"
                    placeholder="New List"
                    className="new-list__input"
                    value={list}
                    onChange={(e) => setList(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreateNewList()}
                />
            </div>
            <span className="new-list__group">
                <NewListLogo/>
            </span>
        </div>
    );
};

export default NewList;
