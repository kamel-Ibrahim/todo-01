import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AuthRegister.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const { register } = useContext(AuthContext);
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  // LAU email pattern: firstname.lastname + optional digits + @lau.edu
  const lauRegex = /^[a-zA-Z]+\.[a-zA-Z0-9]+@lau\.edu$/;

  // allows first.last, first.mid.last, with optional digits

  const isLauEmail = lauRegex.test(email);

  // derive "username" from email (first + last names)
  const derivedName = useMemo(() => {
    if (!isLauEmail) return "";
    const local = email.split("@")[0];            // e.g. "tala.khoury23"
    const parts = local.split(".");               // ["tala", "khoury23"]
    const first = parts[0] ?? "";
    const lastRaw = parts[parts.length - 1] ?? "";
    const last = lastRaw.replace(/\d+$/, "");     // strip trailing digits
    return `${cap(first)} ${cap(last)}`.trim();
  }, [email, isLauEmail]);

  function cap(s) {
    return s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : "";
  }

  const emailError =
    touched.email && !email
      ? "Email is required"
      : touched.email && !isLauEmail
      ? "Use your LAU email (firstname.lastname@lau.edu)"
      : "";

  const passwordError =
    touched.password && !password ? "Password is required" : "";

  const disabled = !isLauEmail || !password;

  const onSubmit = (e) => {
    e.preventDefault();
    if (disabled) return;
    // TODO: hook up to your auth later
    alert(`Registered: ${derivedName || "LAU Student"} (${email})`);
  };

  return (
    <div className="auth-layout">
      {/* LEFT: 70% — form area */}
      <section className="auth-left">
        <div className="auth-card">
          {/* Logo placeholder */}
          <div className="app-mark" aria-hidden>
            {/* put your SVG/logo here later */}
          </div>

          <h1 className="welcome">
            Welcome to <span className="brand">YourApp</span>
          </h1>
          <p className="sub">Create your account with your LAU credentials.</p>

          <form className="form" onSubmit={onSubmit} noValidate>
            <label htmlFor="email">LAU Email</label>
            <input
              id="email"
              className={`input ${emailError ? "invalid" : ""}`}
              type="email"
              placeholder="firstname.lastname@lau.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              required
            />
            {emailError ? <p className="error">{emailError}</p> : null}

            <label htmlFor="password">LAU Password</label>
            <input
              id="password"
              className={`input ${passwordError ? "invalid" : ""}`}
              type="password"
              placeholder="Enter your LAU password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              required
            />
            {passwordError ? <p className="error">{passwordError}</p> : null}

            {/* live preview of derived username */}
            {derivedName && (
              <p className="hint">Username detected: <strong>{derivedName}</strong></p>
            )}

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
      </section>

      {/* RIGHT: 30% — image/illustration area (hidden on phones) */}
      <aside className="auth-right" aria-hidden>
        {/* Replace background in CSS or drop an <img> here */}
        <div className="art"></div>
      </aside>
    </div>
  );
}
