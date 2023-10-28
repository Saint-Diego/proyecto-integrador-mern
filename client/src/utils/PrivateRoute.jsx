import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useTaskContext } from "../hooks/useTaskContext";

const PrivateRoute = ({ redirectPath = "" }) => {
  const { todo } = useTaskContext();

  if (!todo?.isActive) {
    return <Navigate to={redirectPath} replace />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
