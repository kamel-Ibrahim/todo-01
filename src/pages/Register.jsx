import { useMemo, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AuthRegister.css";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  
  const lauRegex = /^[a-z]+(?:\.[a-z]+)*\.[a-z][a-z0-9]*@lau\.edu(?:\.lb)?$/i;
  const isLauEmail = lauRegex.test(email);

  function cap(s) {
    return s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : "";
  }

  const derivedName = useMemo(() => {
    if (!isLauEmail) return "";
    const local = email.split("@")[0];
    const parts = local.split(".");
    const first = parts[0] ?? "";
    const lastRaw = parts[parts.length - 1] ?? "";
    const last = lastRaw.replace(/\d+$/, "");
    return `${cap(first)} ${cap(last)}`.trim();
  }, [email, isLauEmail]);

  const emailError =
    touched.email && !email
      ? "Email is required"
      : touched.email && !isLauEmail
      ? "Use your LAU email (@lau.edu.lb)"
      : "";

  const passwordError =
    touched.password && !password ? "Password is required" : "";

  const disabled = !isLauEmail || !password;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;

    try {
      const cleanEmail = email.trim();

      await register({
        name: derivedName || "LAU Student",
        email: cleanEmail,
        password,
      });

      nav("/");
    } catch (err) {
      console.error(err);
      alert("This account already exists");
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="app-mark" aria-hidden />
        <h1 className="welcome">
          Welcome to <span className="brand">YourApp</span>
        </h1>
        {/* Placeholder to keep same spacing as before */}
        <p className="sub" style={{ visibility: "hidden" }}>
           placeholder</p>

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
            required
            autoComplete="email"
            inputMode="email"
          />
          {emailError ? <p className="error">{emailError}</p> : null}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            className={`input ${passwordError ? "invalid" : ""}`}
            type="password"
            placeholder="Enter your LAU password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            required
            autoComplete="new-password"
          />
          {passwordError ? <p className="error">{passwordError}</p> : null}

        

          <button className="btn" type="submit" disabled={disabled}>
            Register
          </button>
        </form>

        <p className="helper">
          Already have an account?{" "}
          <Link className="link" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
