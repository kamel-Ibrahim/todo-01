import React, {
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { TaskContext } from "../context/TaskContext";
import { apiRequest } from "../api";
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
    } else if (diff > 1) {
      run = 1;
    }
  }
  return { current: run, best };
}

export default function Achievements() {
  const { tasks = [], pastTasks = [] } = useContext(TaskContext) || {};
  const localData = useMemo(() => {
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
  const [remoteStats, setRemoteStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoadingStats(true);
        setStatsError(null);
        const data = await apiRequest("/api/achievements/me");
        setRemoteStats(data);
      } catch (err) {
        console.error("Error fetching achievements stats:", err);
        setStatsError("Failed to sync achievements with server.");
      } finally {
        setLoadingStats(false);
      }
    };

    fetchAchievements();
  }, [tasks, pastTasks]);

  // 🔹 Use backend stats if available, otherwise local computed
  const data = remoteStats || localData;
  const totalDone = data?.totalDone || 0;
  const currentStreak = data?.streak?.current || 0;

  const badges = [
    { id: "done10", icon: "🏅", title: "10 Tasks", goal: 10, value: totalDone },
    { id: "done25", icon: "🎯", title: "25 Tasks", goal: 25, value: totalDone },
    { id: "done50", icon: "⚡", title: "50 Tasks", goal: 50, value: totalDone },
    { id: "done100", icon: "🏆", title: "100 Tasks", goal: 100, value: totalDone },
    { id: "streak3", icon: "🔥", title: "3-Day Streak", goal: 3, value: currentStreak },
    { id: "streak5", icon: "💪", title: "5-Day Streak", goal: 5, value: currentStreak },
    { id: "streak7", icon: "🚀", title: "7-Day Streak", goal: 7, value: currentStreak },
    { id: "login5", icon: "📆", title: "5-Day Login", goal: 5, value: currentStreak },
    { id: "login10", icon: "📈", title: "10-Day Login", goal: 10, value: currentStreak },
  ];

  return (
    <div className="achievements-page-rect">
      <h1 className="achievements-title">Achievements</h1>

      {loadingStats && (
        <p className="achievements-sync-note">
          Syncing achievements with server...
        </p>
      )}
      {statsError && (
        <p className="achievements-error-note">{statsError}</p>
      )}

      <div className="achievements-grid">
        {badges.map((b) => {
          const achieved = (b.value || 0) >= b.goal;
          const pct = Math.min(100, (b.value / b.goal) * 100);
          return (
            <div
              key={b.id}
              className={`badge-card ${achieved ? "unlocked" : "locked"}`}
            >
              <div className="badge-icon">{b.icon}</div>
              <h3 className="badge-title">{b.title}</h3>
              <div className="badge-progress">
                <div
                  className="badge-progress-bar"
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
              <p className="badge-count">
                {Math.min(b.value || 0, b.goal)} / {b.goal}
              </p>
              <span
                className={`badge-status ${
                  achieved ? "status-unlocked" : "status-locked"
                }`}
              >
                {achieved ? "Unlocked" : "Locked"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
