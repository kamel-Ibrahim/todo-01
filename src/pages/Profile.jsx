import React, { useContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import { AuthContext } from "../context/AuthContext";
import MermaidChart from "../components/MermaidChart";

const completed = 12;
const missed = 3;

const pieChart = `pie showData
  title Task Progress
  "Completed": ${completed}
  "Missed": ${missed}
`;


let levelTitle = "Beginner";
if (completed >= 10 && completed < 25) levelTitle = "Rookie";
else if (completed >= 25 && completed < 50) levelTitle = "Achiever";
else if (completed >= 50 && completed < 100) levelTitle = "Expert";
else if (completed >= 100) levelTitle = "Master";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const displayName = user?.name || "Guest";
  const displayEmail = user?.email || "—";

  const initials = useMemo(() => {
    return (displayName || "?")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") || "?";
  }, [displayName]);

  const onLogout = () => {
    logout?.();
    nav("/login");
  };

  // Weekly goals state
  const [goals, setGoals] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("profile_goals") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("profile_goals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    setGoals((prev) =>
      prev.length < 3 ? [...prev, { text: "", done: false }] : prev
    );
  };
  const toggleGoal = (i) => {
    setGoals((prev) =>
      prev.map((g, idx) => (idx === i ? { ...g, done: !g.done } : g))
    );
  };
  const updateGoal = (i, text) => {
    setGoals((prev) => prev.map((g, idx) => (idx === i ? { ...g, text } : g)));
  };
  const removeGoal = (i) => {
    setGoals((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <main className="profile-shell with-navbar">
      <section className="profile-card-left">
        <div className="p-head">
          <div className="p-avatar" aria-label="profile avatar" title={displayName}>
            <span>{initials}</span>
          </div>
          <div className="p-id">
            <h1 className="p-name">{displayName}</h1>
            <div className="p-mail">{displayEmail}</div>
          </div>
        </div>

        <div className="p-rows">
          <div className="p-stat completed">
            <div className="num">{completed}</div>
            <div className="lbl">Tasks completed</div>
          </div>
          <div className="p-stat missed">
            <div className="num">{missed}</div>
            <div className="lbl">Tasks missed</div>
          </div>
          <div className="p-stat level">
            <div className="num">{levelTitle}</div>
            <div className="lbl">Level</div>
          </div>
        </div>
      </section>

      {/* Chart + side panel (about/goals) */}
      <div className="progress-section">
        <div className="chart-wrap">
          <MermaidChart chart={pieChart} dark={true} />
        </div>

        <aside className="side-panel">
          <div className="about-box">
            <h3>About Me</h3>
            <textarea
              placeholder="Write a few lines about yourself…"
              defaultValue={localStorage.getItem("profile_about") || ""}
              onChange={(e) => localStorage.setItem("profile_about", e.target.value)}
            />
          </div>

          <div className="goals-box">
            <div className="goals-head">
              <h3>Weekly Goals</h3>
              <button className="mini-btn transparent-btn" onClick={addGoal} disabled={goals.length >= 3}>
                + Add
              </button>
            </div>

            <ul>
              {goals.length === 0 && (
                <li className="muted-hint">Add up to 3 small wins for this week.</li>
              )}

              {goals.map((g, i) => (
                <li key={i}>
                  <label>
                    <input
                      type="checkbox"
                      checked={!!g.done}
                      onChange={() => toggleGoal(i)}
                    />
                    <input
                      className="goal-text transparent-input"
                      value={g.text}
                      onChange={(e) => updateGoal(i, e.target.value)}
                      placeholder={`Goal ${i + 1}`}
                    />
                  </label>
                  <button
                    type="button"
                    className="mini-btn transparent-btn"
                    style={{ marginLeft: 6, fontSize: "0.85rem", padding: "4px 8px" }}
                    onClick={() => removeGoal(i)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className="profile-actions">
        <button className="btn-logout" onClick={onLogout}>
          <LogoutIcon />
          Log Out
        </button>
      </div>
    </main>
  );
}

function LogoutIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#f9bc60"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}
