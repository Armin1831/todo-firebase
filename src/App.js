import React from "react";
import "./App.css";
import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";

// components
import Layout from "./components/Layout/Layout";
import Main from "./pages/Main/Main";
import TodoDetails from "./pages/TodoDetails/TodoDetails";
import SingUpPage from "./pages/SingUp/SingUpPage";
import SingInPage from "./pages/SingIn/SingInPage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute/>}>
                    <Route index element={<Navigate to="/tasks/inbox" replace/>}/>
                    <Route path="tasks" element={<Layout/>}>
                        <Route index element={<Navigate to="/tasks/inbox" replace/>}/>
                        <Route path=":tasksList" element={<Main/>}>
                            <Route path="id">
                                <Route index element={<Navigate to="/tasks/inbox" replace/>}/>
                                <Route path=":taskId" element={<TodoDetails/>}/>
                            </Route>
                        </Route>
                    </Route>
                </Route>
                <Route path="sing-up" element={<SingUpPage/>}/>
                <Route path="sing-in" element={<SingInPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;


function ProtectedRoute() {

    return <Outlet/>

}

