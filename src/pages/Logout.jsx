import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    logout(); // clears user data
    const timer = setTimeout(() => nav("/login"), 1000);
    return () => clearTimeout(timer);
  }, [logout, nav]);

  return (
    <div className="logout-page">
      <h2>Logging out...</h2>
      <p>You’ll be redirected to the login page shortly.</p>
    </div>
  );
}
