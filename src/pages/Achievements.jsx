import React, { useContext, useMemo } from "react";
import { TaskContext } from "../context/TaskContext";
import "../styles/Achievements.css";

function toDateKey(ts) {
  const d = typeof ts === "number" ? new Date(ts) : new Date(ts ?? Date.now());
  if (isNaN(d.getTime())) return null;
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function computeStreak(dateKeys) {
  if (!dateKeys || dateKeys.size === 0) return { current: 0, best: 0 };
  const dayMs = 24 * 60 * 60 * 1000;
  const days = Array.from(dateKeys).sort();
  let best = 1;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    const diff = (new Date(days[i]) - new Date(days[i - 1])) / dayMs;
    if (diff === 1) {
      run++;
      best = Math.max(best, run);
    } else if (diff > 1) run = 1;
  }
  return { current: run, best };
}

export default function Achievements() {
  const { tasks = [], pastTasks = [] } = useContext(TaskContext) || {};
  const data = useMemo(() => {
    const completed =
      (pastTasks?.length ? pastTasks : tasks)?.filter(
        (t) => t?.done || t?.status === "done"
      );
    const totalDone = completed?.length || 0;
    const dates = new Set(
      completed
        .map((t) =>
          toDateKey(t.completedAt || t.updatedAt || t.createdAt)
        )
        .filter(Boolean)
    );
    return { totalDone, streak: computeStreak(dates) };
  }, [tasks, pastTasks]);

  const badges = [
    { id: "done10", icon: "🏅", title: "10 Tasks", goal: 10, value: data.totalDone },
    { id: "done25", icon: "🎯", title: "25 Tasks", goal: 25, value: data.totalDone },
    { id: "done50", icon: "⚡", title: "50 Tasks", goal: 50, value: data.totalDone },
    { id: "done100", icon: "🏆", title: "100 Tasks", goal: 100, value: data.totalDone },
    { id: "streak3", icon: "🔥", title: "3-Day Streak", goal: 3, value: data.streak.current },
    { id: "streak5", icon: "💪", title: "5-Day Streak", goal: 5, value: data.streak.current },
    { id: "streak7", icon: "🚀", title: "7-Day Streak", goal: 7, value: data.streak.current },
    { id: "login5", icon: "📆", title: "5-Day Login", goal: 5, value: data.streak.current },
    { id: "login10", icon: "📈", title: "10-Day Login", goal: 10, value: data.streak.current },
  ];

  return (
    <div className="achievements-page-rect">
      <h1 className="achievements-title">Achievements</h1>
      <div className="achievements-grid">
        {badges.map((b) => {
          const achieved = (b.value || 0) >= b.goal;
          const pct = Math.min(100, (b.value / b.goal) * 100);
          return (
            <div key={b.id} className={`badge-card ${achieved ? "unlocked" : "locked"}`}>
              <div className="badge-icon">{b.icon}</div>
              <h3 className="badge-title">{b.title}</h3>
              <div className="badge-progress">
                <div className="badge-progress-bar" style={{ width: `${pct}%` }}></div>
              </div>
              <p className="badge-count">{Math.min(b.value, b.goal)} / {b.goal}</p>
              <span className={`badge-status ${achieved ? "status-unlocked" : "status-locked"}`}>
                {achieved ? "Unlocked" : "Locked"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
