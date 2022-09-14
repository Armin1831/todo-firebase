import React, {createContext, useReducer} from 'react';

const initialState = {
    isSortMenuOpen: false,
    isListOptionsOpen: false,
    isLeftSidebarOpen: false,
    isTodoDetailOpen: false
}

export const UiContext = createContext(initialState);


const UiReducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_SIDEBAR":
            return {
                ...state,
                isLeftSidebarOpen: action.payload
            };
        case "TOGGLE_SORT_MENU":
            return {
                ...state,
                isSortMenuOpen: action.payload
            };
        case "TOGGLE_LIST_OPTION":
            return {
                ...state,
                isListOptionsOpen: action.payload
            };
        case "TOGGLE_TODO_DETAIL":
            return {
                ...state,
                isTodoDetailOpen: action.payload
            };
        case "RESET":
            return {
                isSortMenuOpen: false,
                isListOptionsOpen: false,
                isLeftSidebarOpen: false,
                isTodoDetailOpen: false
            };
        default :
            return {...state};
    }
}


const useUiContext = ({children}) => {
    const [state, dispatch] = useReducer(UiReducer, initialState, undefined);

    const toggleSidebar = () => {
        dispatch({type: "RESET"})
        dispatch({type: "TOGGLE_SIDEBAR", payload: !state.isLeftSidebarOpen})
    };
    const toggleSortMenu = () => {
        dispatch({type: "TOGGLE_SORT_MENU", payload: !state.isSortMenuOpen})
    };
    const toggleListOption = () => {
        dispatch({type: "TOGGLE_LIST_OPTION", payload: !state.isListOptionsOpen})
    };
    const toggleTodoDitail = () => {
        dispatch({type: "RESET"})
        dispatch({type: "TOGGLE_TODO_DETAIL", payload: !state.isTodoDetailOpen})
    };

    return (
        <UiContext.Provider
            value={{dispatch, state, toggleSidebar, toggleSortMenu, toggleListOption, toggleTodoDitail}}>
            {children}
        </UiContext.Provider>
    );
};

export default useUiContext;