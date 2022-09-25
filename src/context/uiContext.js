import React, {createContext, useState} from 'react';

const initialState = {
    isSortMenuOpen: false,
    isListOptionsOpen: false,
    isLeftSidebarOpen: false,
}

export const UiContext = createContext(initialState);


const useUiContext = ({children}) => {
    const [uiState, setUiState] = useState(initialState);
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