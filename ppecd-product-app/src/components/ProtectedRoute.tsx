import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { type JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {

  const { loggedIn } = useAuth();
  const loaction = useLocation();

  if (!loggedIn) {
    return <Navigate to="/login" state={{from:loaction}} replace />;
  }

  return children;
};