import React, {memo} from "react";
import Home from "../Containers/Home/home";
import { Navigate, redirect } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return <>
      {isAuthenticated ? children : <Navigate to='/'/>}
    </>
}

export default memo(ProtectedRoute);