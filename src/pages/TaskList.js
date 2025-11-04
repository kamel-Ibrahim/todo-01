import React, { useContext, useMemo, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import CategorySelect from "../components/CategorySelect";
import "../styles/App.css";

const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  // local UI filters
  const [status, setStatus] = useState("all"); // all | active | done
  const [category, setCategory] = useState("All"); // All or specific
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    let list = [...tasks];

    if (status !== "all") {
      list = list.filter((t) => (status === "done" ? t.done : !t.done));
    }

    if (category && category !== "All") {
      list = list.filter((t) => (t.category || "General") === category);
    }

    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(needle) ||
          (t.description || "").toLowerCase().includes(needle)
      );
    }

    // sort: nearest due first, then recently updated
    list.sort((a, b) => {
      const ad = Number.isFinite(a.dueAt) ? a.dueAt : Number.MAX_SAFE_INTEGER;
      const bd = Number.isFinite(b.dueAt) ? b.dueAt : Number.MAX_SAFE_INTEGER;
      if (ad !== bd) return ad - bd;
      return (b.updatedAt || b.id) - (a.updatedAt || a.id);
    });

    return list;
  }, [tasks, status, category, q]);

  return (
    <div className="center-wrapper">
      <div className="container">
        <h1>Tasks</h1>
        <p style={{ marginTop: 4, color: "#64748b" }}>
          {filtered.length} task{filtered.length !== 1 ? "s" : ""} shown
        </p>

        {/* Filters row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 10, marginTop: 12 }}>
          <div>
            <label className="form-label" style={{ display: "block", marginBottom: 6, color: "#475569" }}>Status</label>
            <div className="category-buttons">
              <button className={`btn ${status === "all" ? "btn-primary active" : ""}`} onClick={() => setStatus("all")}>All</button>
              <button className={`btn ${status === "active" ? "btn-primary active" : ""}`} onClick={() => setStatus("active")}>Active</button>
              <button className={`btn ${status === "done" ? "btn-primary active" : ""}`} onClick={() => setStatus("done")}>Done</button>
            </div>
          </div>

          <div>
            <label className="form-label" style={{ display: "block", marginBottom: 6, color: "#475569" }}>Category</label>
            <CategorySelect value={category} onChange={setCategory} includeAll />
          </div>

          <div>
            <label className="form-label" style={{ display: "block", marginBottom: 6, color: "#475569" }}>Search</label>
            <input
              className="input-field"
              placeholder="Search title or description…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        <div className="task-list" style={{ marginTop: 14 }}>
          {filtered.length === 0 ? (
            <p style={{ color: "#64748b" }}>No tasks match your filters.</p>
          ) : (
            filtered.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
