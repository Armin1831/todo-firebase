import React from 'react';
import { useReducer } from 'react';
import { createContext} from 'react';

const useUiContext = ({children}) => {
    const [state,dispach] = useReducer()
    const UiContext = createContext()

    return (
        <UiContext.Provider >
            {children}
        </UiContext.Provider>
    );
};

export default useUiContext;