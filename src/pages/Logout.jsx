// src/pages/Logout.jsx
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    // Call your logout function from AuthContext
    logout?.();
    // Redirect to register (or login) after logout
    nav("/register", { replace: true });
  }, [logout, nav]);

  return (
    <div style={{ padding: 16, textAlign: "center" }}>
      <h2>Logging out...</h2>
      <p>We’re safely signing you out of your account.</p>
    </div>
  );
}
