import React, {createContext, useState} from 'react';

const initialState = {
    user: null
}

export const userContext = createContext(initialState);


const useUserContext = ({children}) => {
    const [user, setUser] = useState(initialState);
    const userComeIn = (user) => {
        setUser((prevState) => {
            return {
                ...prevState,
                user
            }
        })
    }
    return (
        <userContext.Provider
            value={{user, userComeIn}}
        >
            {children}
        </userContext.Provider>
    );
};

export default useUserContext;