import React, {createContext, useState} from 'react';
import {Outlet, useParams} from "react-router-dom";


export const colorContext = createContext({
    currentColor: "linear-gradient(to bottom left, #765ee6, #1c9fff)",
    handleSetColor: (color) => color
});


const ColorContext = () => {
    const {tasksListId} = useParams();
    const [currentColor, setCurrentColor] = useState(() => {
        const saved = localStorage.getItem("listColor");
        const initialValue = JSON.parse(saved) ?
            JSON.parse(saved)[tasksListId] : "linear-gradient(to bottom left, #765ee6, #1c9fff)"
        return initialValue;
    });

    const handleSetColor = (color) => {
        setCurrentColor(color)
    }

    return (
        <colorContext.Provider
            value={{currentColor, handleSetColor}}
        >
            <Outlet/>
        </colorContext.Provider>
    );
};

export default ColorContext;