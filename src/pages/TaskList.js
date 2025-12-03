import React, { useContext, useMemo, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import CategorySelect from "../components/CategorySelect";
import "../styles/App.css";
import ProtectedShell from "../components/ProtectedShell";

const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  const [status, setStatus] = useState("all"); // all | active | done
  const [category, setCategory] = useState("All");
  const [q, setQ] = useState("");

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.done).length;
    const active = total - completed;
    return { total, completed, active };
  }, [tasks]);

  const filtered = useMemo(() => {
    let list = [...tasks];

    if (status !== "all") {
      const wantDone = status === "done";
      list = list.filter((t) => !!t.done === wantDone);
    }

    if (category && category !== "All") {
      list = list.filter((t) => (t.category || "General") === category);
    }

    if (q.trim()) {
      const needle = q.toLowerCase();
      list = list.filter((t) => {
        const text = ((t.title || "") + " " + (t.description || "")).toLowerCase();
        return text.includes(needle);
      });
    }

    // newest first by createdAt
    list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    return list;
  }, [tasks, status, category, q]);

  return (
    <ProtectedShell title="Tasks">
      <div className="tasks-header-row">
        <div>
          <div className="tasks-count">
            {stats.total} task{stats.total !== 1 ? "s" : ""} total
          </div>
          <div className="tasks-sub">
            {stats.completed} completed · {stats.active} active
          </div>
        </div>
      </div>

      <div className="filters-row">
        <div className="filter-group">
          <span className="form-label">Status</span>
          <div className="status-chips">
            <button
              type="button"
              className={`chip ${status === "all" ? "chip-active" : ""}`}
              onClick={() => setStatus("all")}
            >
              All
            </button>
            <button
              type="button"
              className={`chip ${status === "active" ? "chip-active" : ""}`}
              onClick={() => setStatus("active")}
            >
              Active
            </button>
            <button
              type="button"
              className={`chip ${status === "done" ? "chip-active" : ""}`}
              onClick={() => setStatus("done")}
            >
              Done
            </button>
          </div>
        </div>

        <div className="filter-group">
          <span className="form-label">Category</span>
          <CategorySelect value={category} onChange={setCategory} />
        </div>

        <div className="filter-group">
          <span className="form-label">Search</span>
          <input
            className="input-field"
            type="text"
            placeholder="Search by title or description…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      <div className="task-list">
        {filtered.length === 0 ? (
          <p className="empty-task-text">No tasks match your filters.</p>
        ) : (
          filtered.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </ProtectedShell>
  );
};

export default TaskList;
