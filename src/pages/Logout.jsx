import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    logout?.();
    // takes u back to register page after you logout
    nav("/register", { replace: true });
  }, [logout, nav]);

  return (
    <div style={{ padding: 16, textAlign: "center" }}>
      <h2>Logging out...</h2>
      <p>We’re safely signing you out of your account.</p>
    </div>
  );
}
