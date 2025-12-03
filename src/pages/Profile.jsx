import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";
import MermaidChart from "../components/MermaidChart";

export default function Profile() {
  const { user, logout, updateProfile } = useContext(AuthContext);
  const { tasks } = useContext(TaskContext);
  const nav = useNavigate();

  const [bio, setBio] = useState(() => user?.bio || "");
  const [goals, setGoals] = useState(() =>
    Array.isArray(user?.goals) ? user.goals : []
  );
  const [savingProfile, setSavingProfile] = useState(false);
  const [now] = useState(() => Date.now());

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const addGoal = () => {
    if (goals.length >= 3) return;
    setGoals((prev) => [...prev, { text: "", done: false }]);
  };

  const toggleGoal = (index) => {
    setGoals((prev) =>
      prev.map((g, i) =>
        i === index ? { ...g, done: !g.done } : g
      )
    );
  };

  const updateGoal = (index, text) => {
    setGoals((prev) =>
      prev.map((g, i) =>
        i === index ? { ...g, text } : g
      )
    );
  };

  const removeGoal = (index) => {
    setGoals((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true);
      if (typeof updateProfile === "function") {
        await updateProfile({ bio, goals });
      }
      window.alert("Profile updated successfully.");
    } catch (err) {
      console.error("Failed to save profile:", err);
      window.alert("Failed to update profile. Please try again.");
    } finally {
      setSavingProfile(false);
    }
  };

  // ---- TASK STATS ----
  const { completed, missed } = useMemo(() => {
    let completed = 0;
    let missed = 0;
    const nowMs = now;

    tasks.forEach((t) => {
      if (t.done) {
        completed += 1;
      } else if (t.dueAt) {
        const due = new Date(t.dueAt).getTime();
        if (!Number.isNaN(due) && due < nowMs) {
          missed += 1;
        }
      }
    });

    return { completed, missed };
  }, [tasks, now]);

  let levelTitle = "Beginner";
  if (completed >= 10 && completed < 25) levelTitle = "Rookie";
  else if (completed >= 25 && completed < 50) levelTitle = "Achiever";
  else if (completed >= 50 && completed < 100) levelTitle = "Expert";
  else if (completed >= 100) levelTitle = "Master";

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
    if (typeof logout === "function") {
      logout();
    }
    nav("/login");
  };

  return (
    <main className="profile-shell with-navbar">
      {/* LEFT CARD */}
      <section className="profile-card-left">
        <div className="p-head">
          <div
            className="p-avatar"
            aria-label="profile avatar"
            title={displayName}
          >
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

      {/* RIGHT SIDE */}
      <div className="progress-section">
        <div className="chart-wrap">
          <MermaidChart />
        </div>

        <aside className="side-panel">
          <div className="about-box">
            <h3>About Me</h3>
            <textarea
              placeholder="Write a few lines about yourself…"
              value={bio}
              onChange={handleBioChange}
            />
          </div>

          {/* WEEKLY GOALS */}
          <div className="goals-box">
            <div className="goals-head">
              <h3>Weekly Goals</h3>
              <button
                type="button"
                className="mini-btn transparent-btn"
                onClick={addGoal}
                disabled={goals.length >= 3}
              >
                + Add
              </button>
            </div>

            <ul>
              {goals.length === 0 && (
                <li className="muted-hint">
                  Add up to 3 small wins for this week.
                </li>
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
                    style={{
                      marginLeft: 6,
                      fontSize: "0.85rem",
                      padding: "4px 8px",
                    }}
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

      {/* ACTIONS */}
      <div className="profile-actions">
        <button
          type="button"
          className="mini-btn"
          onClick={handleSaveProfile}
          disabled={savingProfile}
        >
          {savingProfile ? "Saving..." : "Save Profile"}
        </button>
        <button
          type="button"
          className="btn-logout"
          onClick={onLogout}
        >
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
