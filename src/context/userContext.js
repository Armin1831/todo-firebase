import React, {createContext, useEffect, useState} from 'react';
import {auth} from "../firebase/firebase.config";
import {onAuthStateChanged} from "firebase/auth";
import Spinner from "../components/Spinner/Spinner";


export const userContext = createContext({
    user: {
        user: null,
        authIsReady: false
    },
    userComeIn: (user) => {
        return user;
    },
    userComeOut: () => {
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
        },error => {
            console.log(error)
        });
    }, []);
    return (
        <userContext.Provider
            value={{user, userComeIn, userComeOut}}
        >
            {user.authIsReady ?
                <>
                    {children}
                </> : <Spinner/>
            }
        </userContext.Provider>
    );
};

export default useUserContext;