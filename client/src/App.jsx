import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ContextTask from "./context/ContextTask";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <>
      <ContextTask>
        <Router>
          <Routes>
            <Route index path="" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="home" element={<Home />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ContextTask>
    </>
  );
}

export default App;
