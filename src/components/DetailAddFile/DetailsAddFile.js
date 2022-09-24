import React from 'react';
import "./DetailsAddFile.css";

// icons
import {ReactComponent as AddFileLogo} from "../../assets/images/icons/add-file-logo.svg";

const DetailsAddFile = () => {
    return (
        <div className="add-file p-relative">
            <span className="add-file__icon">
                <AddFileLogo/>
            </span>
            <input type="file" className="add-file__input"/>
            <p className="add-file__title">Add file</p>
        </div>
    );
};

export default DetailsAddFile;
