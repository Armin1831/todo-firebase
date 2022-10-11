import React, {useContext} from "react";
import "./App.css";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {userContext} from "./context/userContext";
import TasksContext from "./context/tasksContext";
import ListsContext from "./context/listsContext";

// components
import Layout from "./components/Layout/Layout";
import SingUpPage from "./pages/SingUp/SingUpPage";
import SingInPage from "./pages/SingIn/SingInPage";



function App() {
    const {user} = useContext(userContext);

    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute user={user.user}/>}>
                <Route element={<TasksContext/>}>
                    <Route element={<ListsContext/>}>
                        <Route index element={<Navigate to="tasks/inbox" replace/>}/>
                        <Route path="tasks/*" element={<Layout/>}/>
                    </Route>
                </Route>
            </Route>
            <Route path="/" element={<CommonRoute user={user.user}/>}>
                <Route path="sing-up" element={<SingUpPage/>}/>
                <Route path="sing-in" element={<SingInPage/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
}

export default App;


function ProtectedRoute({user}) {

    return user ? <Outlet/> : <Navigate to="/sing-up" replace/>

}

function CommonRoute({user}) {

    return !user ? <Outlet/> : <Navigate to="/tasks/inbox" replace/>

}




