import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { user, login } = useContext(AuthContext);
  const nav = useNavigate();
  const [email, setEmail] = useState("");

  // skip this page if already logged in
  useEffect(() => {
    if (user) nav("/profile");
  }, [user, nav]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert("Enter your email");
    login(email);          // sets user in context/localStorage
    nav("/profile");       // go to profile after login
  };

  return (
    <div className="login-page">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
}