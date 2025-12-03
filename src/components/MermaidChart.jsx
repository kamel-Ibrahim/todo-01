import React, { useContext, useMemo } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskPieChart from "./TaskPieChart";

/**
 * MermaidChart stub:
 * keeps same component name/props but renders a React-only pie chart
 * based on global task data instead of using mermaid.js.
 */
export default function MermaidChart({ chart, dark = true }) {
  const { tasks } = useContext(TaskContext);
  const now = Date.now();

  const { completed, missed } = useMemo(() => {
    let c = 0;
    let m = 0;

    tasks.forEach((t) => {
      if (t.done) {
        c += 1;
      } else if (t.dueAt) {
        const due = new Date(t.dueAt).getTime();
        if (!Number.isNaN(due) && due < now) {
          m += 1;
        }
      }
    });

    return { completed: c, missed: m };
  }, [tasks, now]);

  return <TaskPieChart completed={completed} missed={missed} />;
}
