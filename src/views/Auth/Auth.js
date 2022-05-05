import React from "react";
import { Outlet } from "react-router-dom";
import "./auth.css";

function Auth() {
  return (
    <div className="authPage">
      <Outlet />
    </div>
  );
}

export default Auth;
