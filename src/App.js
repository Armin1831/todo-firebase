import React from "react";
import "./App.css";

import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Main from "./pages/Main/Main";
import TodoDetails from "./pages/TododDetails/TodoDetails";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="tasks/inbox" replace/>}/>
                <Route path="tasks" element={<Layout/>}>
                    <Route index element={<Navigate to="/tasks/inbox" replace/>}/>
                    <Route path=":tasksList" element={<Main/>}>
                        <Route path="id">
                            <Route index element={<Navigate to="/tasks/inbox" replace/>}/>
                            <Route path=":taskId" element={<TodoDetails/>}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
