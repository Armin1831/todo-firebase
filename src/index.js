import React from 'react';
import ReactDOM from 'react-dom/client';
import UiContext from "./context/uiContext";
import UserContext from "./context/userContext";
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <UserContext>
                <UiContext>
                    <App/>
                </UiContext>
        </UserContext>
    </React.StrictMode>
);


