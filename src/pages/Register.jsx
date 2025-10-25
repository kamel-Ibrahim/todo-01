import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // mocked only

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return alert("Please fill name and email");
    register({ name, email });
    nav("/profile");
  };

  return (
    <div className="register-page">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={name}
               onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email}
               onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password (mocked)" value={password}
               onChange={(e) => setPassword(e.target.value)} />
        <button className="button" type="submit">Register</button>
      </form>
    </div>
  );
}
