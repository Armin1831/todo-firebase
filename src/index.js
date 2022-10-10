import React from 'react';
import ReactDOM from 'react-dom/client';
import UiContext from "./context/uiContext";
import UserContext from "./context/userContext";
import ListsContext from "./context/listsContext";
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserContext>
                <ListsContext>
                    <UiContext>
                        <App/>
                    </UiContext>
                </ListsContext>
            </UserContext>
        </BrowserRouter>
    </React.StrictMode>
);


