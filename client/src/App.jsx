import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ContextTask from "./context/ContextTask";
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
import Login from "./components/Login/Login";
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
import Loading from "./components/Loading/Loading";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <ContextTask>
      <Router>
        <Routes>
          <Route index exact path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </ContextTask>
  );
}

export default App;
