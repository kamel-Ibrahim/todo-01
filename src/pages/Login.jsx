import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AuthRegister.css";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [formError, setFormError] = useState("");

  const lauRegex =
    /^[a-z]+(?:\.[a-z]+)*\.[a-z][a-z0-9]*@lau\.edu(?:\.lb)?$/i;
  const isLauEmail = lauRegex.test(email);

  const emailError =
    touched.email && !isLauEmail
      ? "Please enter a valid LAU email (e.g., firstname.lastname@lau.edu.lb)."
      : "";

  const passwordError =
    touched.password && !password ? "Password is required." : "";

  const disabled = !isLauEmail || !password;

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (disabled) {
      setTouched({ email: true, password: true });
      return;
    }

    try {
      const cleanEmail = email.trim();
      await login(cleanEmail, password);
      nav("/home", { replace: true });
    } catch (err) {
      setFormError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src="/logo512.png" alt="YourApp Logo" className="app-mark" />
        <h1 className="welcome">
          Welcome <span className="brand">back</span>
        </h1>

        {formError ? <p className="error">{formError}</p> : null}

        <form className="form" onSubmit={onSubmit} noValidate>
          <label htmlFor="email">LAU Email</label>
          <input
            id="email"
            className={`input ${emailError ? "invalid" : ""}`}
            type="email"
            placeholder="Enter your LAU email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => {
              setEmail((prev) => prev.trim());
              setTouched((t) => ({ ...t, email: true }));
            }}
          />
          {emailError ? <p className="error">{emailError}</p> : null}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            className={`input ${passwordError ? "invalid" : ""}`}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() =>
              setTouched((t) => ({ ...t, password: true }))
            }
          />
          {passwordError ? <p className="error">{passwordError}</p> : null}

          <button className="btn" type="submit" disabled={disabled}>
            Log In
          </button>
        </form>

        <p className="helper">
          Don’t have an account?{" "}
          <Link className="link" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
