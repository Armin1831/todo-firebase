import React from 'react';
import "./Spinner.css";
import {ReactComponent as SpinnerLogo} from "../../assets/images/gifs/Spinner-1s-397px.svg";

const Spinner = () => {
    return (
        <div className="spinner">
            <SpinnerLogo/>
            <p>Please wait until it is fully loaded</p>
        </div>
    );
};

export default Spinner;
