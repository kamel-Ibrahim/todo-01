import React from "react";

function TaskItem({ task, removeTask }) {
  return (
    <div className="task-item">
      <span>{task.text}</span>
      <button
        onClick={() => removeTask(task.id)}
        style={{
          backgroundColor: "#C0392B",
          color: "white",
          marginLeft: "10px",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
