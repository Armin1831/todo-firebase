import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Main from "./pages/Main/Main";
import TodoDetails from "./pages/TododDetails/TodoDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="tasks/inbox" replace />} />
        <Route path="tasks" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path=":tasksList" element={<Main />}>
            <Route path="id">
              <Route path=":taskId" element={<TodoDetails />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Routes>
        <Route path="sing-in" element={<div>sing in page</div>} />
        {/* <Route path="tasks/*" element={<div>tasks</div>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
