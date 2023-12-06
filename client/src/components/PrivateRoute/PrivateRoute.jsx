import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useTaskContext } from "../../hooks/useTaskContext";
import Loading from "../Loading/Loading";

const PrivateRoute = ({ children, redirectTo = "/" }) => {
  const { user } = useTaskContext();

  return !!user?.token ? (
    <Suspense fallback={<Loading />}>
      {children ? children : <Outlet />}
    </Suspense>
  ) : (
    <Navigate to={redirectTo} replace />
  );
  // if (!isAllowed) {
  //   return <Navigate to={redirectTo} replace />;
  // }
  // return children ? children : <Outlet />;
};

export default PrivateRoute;
