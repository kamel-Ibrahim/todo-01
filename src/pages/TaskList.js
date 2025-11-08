import React, { useContext, useMemo, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import CategorySelect from "../components/CategorySelect";
import "../styles/App.css";
import ProtectedShell from "../components/ProtectedShell";

const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  const [status, setStatus] = useState("all"); // all | active | done
  const [category, setCategory] = useState("All"); // All or specific
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    let list = [...tasks];

    if (status !== "all") {
      const wantDone = status === "done";
      list = list.filter((t) => !!t.done === wantDone);
    }

    if (category && category !== "All") {
      list = list.filter((t) => (t.category || "Uncategorized") === category);
    }

    if (q.trim()) {
      const needle = q.toLowerCase();
      list = list.filter((t) => {
        const title = (t.title || "").toLowerCase();
        const notes = (t.notes || "").toLowerCase();
        return title.includes(needle) || notes.includes(needle);
      });
    }

    return list;
  }, [tasks, status, category, q]);

  return (
    <ProtectedShell title="Tasks">
      <p className="stack-md" style={{ opacity: 0.9 }}>
        {filtered.length} task{filtered.length !== 1 ? "s" : ""} shown
      </p>

      {/* Filters row */}
      <div
        className="filters-row"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 2fr",
          gap: 10,
          marginTop: 12,
        }}
      >
        <div>
          <label
            className="form-label"
            style={{ display: "block", marginBottom: 6, color: "#e6f2f0" }}
          >
            Status
          </label>
          <div className="category-buttons">
            <button
              className={`btn ${status === "all" ? "btn-primary" : ""}`}
              onClick={() => setStatus("all")}
            >
              All
            </button>
            <button
              className={`btn ${status === "active" ? "btn-primary" : ""}`}
              onClick={() => setStatus("active")}
            >
              Active
            </button>
            <button
              className={`btn ${status === "done" ? "btn-primary" : ""}`}
              onClick={() => setStatus("done")}
            >
              Done
            </button>
          </div>
        </div>

        <div>
          <label
            className="form-label"
            style={{ display: "block", marginBottom: 6, color: "#e6f2f0" }}
          >
            Category
          </label>
          <CategorySelect
            value={category}
            onChange={(v) => setCategory(v)}
            allowAll
          />
        </div>

        <div>
          <label
            className="form-label"
            style={{ display: "block", marginBottom: 6, color: "#e6f2f0" }}
          >
            Search
          </label>
          <input
            className="input-field"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title or notes…"
          />
        </div>
      </div>

      <div className="task-list" style={{ marginTop: 14 }}>
        {filtered.length === 0 ? (
          <p style={{ color: "#d7ebe8" }}>No tasks match your filters.</p>
        ) : (
          filtered.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </ProtectedShell>
  );
};

export default TaskList;
