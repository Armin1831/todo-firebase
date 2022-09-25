import React, {createContext, useEffect, useState} from 'react';
import {auth} from "../firebase/firebase.config";
import {onAuthStateChanged} from "firebase/auth";


export const userContext = createContext({
    user: {
        user: null,
        authIsReady: false
    },
    userComeIn: (user) => {
        return user;
    }
});


const useUserContext = ({children}) => {
    const [user, setUser] = useState({
        user: null,
        authIsReady: false
    });
    const userComeIn = (user) => {
        setUser((prevState) => {
            return {
                ...prevState,
                user,
                authIsReady: true
            }
        })
    }
    const userComeOut = () => {
        setUser((prevState) => {
            return {
                ...prevState,
                user: null,
                authIsReady: true
            }
        })
    }
    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            setUser((prevState) => {
                return {
                    ...prevState,
                    user,
                    authIsReady: true
                }
            })
            unSub()
        });
    }, []);
    return (
        <userContext.Provider
            value={{user, userComeIn, userComeOut}}
        >
            {children}
        </userContext.Provider>
    );
};

export default useUserContext;