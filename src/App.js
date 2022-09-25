import React, {useContext} from "react";
import "./App.css";
import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import {userContext} from "./context/userContext";

// components
import Layout from "./components/Layout/Layout";
import Main from "./pages/Main/Main";
import SingUpPage from "./pages/SingUp/SingUpPage";
import SingInPage from "./pages/SingIn/SingInPage";


function App() {
    const {user} = useContext(userContext);

    return (
        <>
            {user.authIsReady && (
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ProtectedRoute user={user.user}/>}>
                            <Route index element={<Navigate to="/tasks/inbox" replace/>}/>
                            <Route path="tasks" element={<Layout/>}>
                                <Route index element={<Navigate to="/tasks/inbox" replace/>}/>
                                <Route path=":tasksList/*" element={<Main/>}/>
                            </Route>
                        </Route>
                        <Route path="/" element={<CommonRoute user={user.user}/>}>
                            <Route path="sing-up" element={<SingUpPage/>}/>
                            <Route path="sing-in" element={<SingInPage/>}/>
                        </Route>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                </BrowserRouter>
            )}
        </>
    );
}

export default App;


function ProtectedRoute({user}) {

    return user ? <Outlet/> : <Navigate to="/sing-up" replace/>

}

function CommonRoute({user}) {

    return !user ? <Outlet/> : <Navigate to="/tasks/inbox" replace/>

}

