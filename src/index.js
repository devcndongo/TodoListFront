import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css"

import Create from "./pages/Create";
import Tasks from "./pages/tasks";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="register" element={<Create />} />
              <Route path="tasks" element={<Tasks/>} />
              
                
              </Route>
              
            </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
