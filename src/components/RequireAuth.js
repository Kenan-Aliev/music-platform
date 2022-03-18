import React from "react";
import { Navigate } from "react-router-dom";

function RequireAuth(props) {
  if (props.isAuth) {
    return props.children;
  }
  return <Navigate to="/" />;
}

export default RequireAuth;
