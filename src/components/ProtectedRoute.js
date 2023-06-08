import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Outlet from "./Outlet";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? (
    <Outlet>{children}</Outlet>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
