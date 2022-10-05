import React, {createContext, useState} from 'react';


export const UiContext = createContext({
    uiState:{
        isSortMenuOpen: false,
        isListOptionsOpen: false,
        isLeftSidebarOpen: false,
    },
    uiStateHandler: (name) => {
        return name;
    }
});


const useUiContext = ({children}) => {
    const [uiState, setUiState] = useState({
        isSortMenuOpen: false,
        isListOptionsOpen: false,
        isLeftSidebarOpen: false,
    });
    const uiStateHandler = (name, outside = false) => {
        setUiState((prevState) => {
            return {
                ...prevState,
                [name]: outside ? false : !prevState[name]
            }
        })
    }
    return (
        <UiContext.Provider
            value={{uiState, uiStateHandler}}
        >
            {children}
        </UiContext.Provider>
    );
};

export default useUiContext;