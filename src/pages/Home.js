import React, { useContext, useState, useEffect, useRef } from "react";
import TaskForm from "../components/TaskForm";
import { TaskContext } from "../context/TaskContext";
import "../styles/App.css";

const Home = () => {
  const { tasks, addTask } = useContext(TaskContext);

  // --- Reminders and notifications (unchanged) ---
  const [now, setNow] = useState(Date.now());
  const notifiedRef = useRef(new Set());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000); // tick every 30s
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  const beep = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 880;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      g.gain.setValueAtTime(0.2, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      o.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  };

  useEffect(() => {
    tasks.forEach((t) => {
      if (!t.dueAt || t.done) return;
      const due = typeof t.dueAt === "number" ? t.dueAt : Date.parse(t.dueAt);
      if (!Number.isFinite(due)) return;
      const diff = due - now;

      const keyOver = t.id + ":over";
      const keySoon = t.id + ":soon";
      const keyVerySoon = t.id + ":very";
      const already = notifiedRef.current;

      const trigger = (k, title) => {
        if (already.has(k)) return;
        already.add(k);
        beep();
        if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
          new Notification(title, { body: t.title });
        }
      };

      if (diff <= 0) trigger(keyOver, "Task due!");
      else if (diff <= 10 * 60 * 1000) trigger(keyVerySoon, "Task due in < 10 minutes");
      else if (diff <= 60 * 60 * 1000) trigger(keySoon, "Task due in < 1 hour");
    });
  }, [tasks, now]);

  return (
    <>
      <div className="center-wrapper">
        <div className="container">
          <h1>Home</h1>
          <p style={{ marginTop: "0.25rem", color: "#475569" }}>
            Today: {new Date(now).toLocaleString()}
          </p>

          {/* Keep add form on Home */}
          <TaskForm addTask={addTask} />

          {/* Calendar / placeholder remains */}
          <div className="calendar-view">
            <h2>📅 Calendar View</h2>
            {tasks.length === 0 ? <p>No tasks yet</p> : <p>Calendar coming soon…</p>}
          </div>

          {/* Small hint to go to Tasks for the list */}
          <p style={{ marginTop: "12px", color: "#64748b" }}>
            To view and manage your list, go to <strong>Tasks</strong> in the top bar.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
