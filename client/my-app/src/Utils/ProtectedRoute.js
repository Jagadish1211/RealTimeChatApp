import React, {memo} from "react";
import Login from "../Containers/Login/login";


const ProtectedRoute = ({children}) => {
    const getAuthStatus = () => false;
    const isAuthenticated = getAuthStatus();
  return (
    <>
        { isAuthenticated ? children : <Login /> }
    </>
  );
}

export default memo(ProtectedRoute);