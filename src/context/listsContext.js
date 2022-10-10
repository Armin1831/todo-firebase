import React, {createContext, useContext} from 'react';
import {userContext} from "./userContext";
import useCollection from "../hooks/useCollection";

const initialLists = [
    {
        id: "inbox",
        name: "inbox",
        group: null
    },
    {
        id: "my_day",
        name: "my_day",
        group: null
    },
    {
        id: "important",
        name: "important",
        group: null
    },
    {
        id: "planned",
        name: "planned",
        group: null
    },
    {
        id: "assigned_to_me",
        name: "assigned_to_me",
        group: null
    }
];

const initialState = {
    notInitialLists: [],
    initialLists
}

export const listsContext = createContext(initialState);


const useListsContext = ({children}) => {
    const {user: {user}} = useContext(userContext);
    const {docs: lists} = useCollection("lists", ["userCreator", "==", user.uid]);


    return (
        <listsContext.Provider
            value={{notInitialLists: lists, initialLists}}
        >
            {children}
        </listsContext.Provider>
    );
};

export default useListsContext;