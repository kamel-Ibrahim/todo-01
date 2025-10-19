import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, removeTask }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div>
        <h2 style={{ textAlign: "center", color: "#0E5E44" }}>No tasks yet</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#0E5E44" }}>Your Tasks</h2>
      <div>
        {tasks.map((task) => (
          task && task.text ? (
            <TaskItem key={task.id} task={task} removeTask={removeTask} />
          ) : null
        ))}
      </div>
    </div>
  );
}

export default TaskList;
