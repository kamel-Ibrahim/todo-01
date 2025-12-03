import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiRequest } from "../api";
import { AuthContext } from "./AuthContext";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);       // active (non-archived) tasks
  const [pastTasks, setPastTasks] = useState([]); // completed / archived tasks
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState("all"); // all | active | done
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [titleQuery, setTitleQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt"); // createdAt | dueAt | title
  const [sortDir, setSortDir] = useState("desc"); // asc | desc

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setPastTasks([]);
      return;
    }
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest("/api/tasks?includeArchived=true");
      const mapped = data.map((t) => ({ ...t, id: t._id })); // map _id → id for UI

      setTasks(mapped.filter((t) => !t.archived));                 // active ones
      setPastTasks(mapped.filter((t) => t.archived || t.done));    // history
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskInput) => {
    const { title, description, category, subtasks, dueAt } = taskInput;

    const payload = {
      title,
      description: description || "",
      category: category || "",
      dueAt: dueAt ? new Date(dueAt).toISOString() : null,
      subtasks: (subtasks || []).map((st) => ({
        text: st.text,
        done: !!st.done,
      })),
    };

    const created = await apiRequest("/api/tasks", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const mapped = { ...created, id: created._id };
    setTasks((prev) => [mapped, ...prev]);
  };

  const updateTask = async (id, updates) => {
    const payload = { ...updates };

    if (payload.dueAt && typeof payload.dueAt === "number") {
      payload.dueAt = new Date(payload.dueAt).toISOString();
    }

    if (payload.subtasks) {
      payload.subtasks = payload.subtasks.map((st) => ({
        text: st.text,
        done: !!st.done,
      }));
    }

    const updated = await apiRequest(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    const mapped = { ...updated, id: updated._id };

    setTasks((prev) => prev.map((t) => (t._id === id ? mapped : t)));
    setPastTasks((prev) => prev.map((t) => (t._id === id ? mapped : t)));
  };

  const toggleDone = async (id) => {
    const current =
      tasks.find((t) => t._id === id) || pastTasks.find((t) => t._id === id);
    if (!current) return;

    const updated = await apiRequest(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({ done: !current.done }),
    });

    const mapped = { ...updated, id: updated._id };

    setTasks((prev) => {
      const others = prev.filter((t) => t._id !== id);
      if (!mapped.archived && !mapped.done) return [mapped, ...others];
      if (!mapped.archived && mapped.done) return [mapped, ...others];
      return others; 
    });

    setPastTasks((prev) => {
      const others = prev.filter((t) => t._id !== id);
      if (mapped.archived || mapped.done) return [mapped, ...others];
      return others;
    });
  };

  const removeTask = async (id) => {
    await apiRequest(`/api/tasks/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const clearFilters = () => {
    setStatusFilter("all");
    setCategoryFilter("All");
    setTitleQuery("");
    setSortBy("createdAt");
    setSortDir("desc");
  };

  const visibleTasks = useMemo(() => {
    let list = [...tasks];

    if (statusFilter === "active") {
      list = list.filter((t) => !t.done);
    } else if (statusFilter === "done") {
      list = list.filter((t) => t.done);
    }

    if (categoryFilter && categoryFilter !== "All") {
      list = list.filter(
        (t) => (t.category || "General") === categoryFilter
      );
    }

    if (titleQuery) {
      const q = titleQuery.toLowerCase();
      list = list.filter((t) =>
        (t.title || "").toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      let aVal;
      let bVal;

      if (sortBy === "title") {
        aVal = (a.title || "").toLowerCase();
        bVal = (b.title || "").toLowerCase();
      } else if (sortBy === "dueAt") {
        aVal = a.dueAt ? Date.parse(a.dueAt) : 0;
        bVal = b.dueAt ? Date.parse(b.dueAt) : 0;
      } else {
        aVal = a.createdAt ? Date.parse(a.createdAt) : 0;
        bVal = b.createdAt ? Date.parse(b.createdAt) : 0;
      }

      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [
    tasks,
    statusFilter,
    categoryFilter,
    titleQuery,
    sortBy,
    sortDir,
  ]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        pastTasks,
        loading,
        error,
        addTask,
        updateTask,
        toggleDone,
        removeTask,
        statusFilter,
        setStatusFilter,
        categoryFilter,
        setCategoryFilter,
        titleQuery,
        setTitleQuery,
        sortBy,
        setSortBy,
        sortDir,
        setSortDir,
        visibleTasks,
        clearFilters,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
