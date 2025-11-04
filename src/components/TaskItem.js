import React from 'react';

const TaskCard = ({ task, removeTask }) => {
  if (!task) return null; // Guard against undefined task

  return (
    <div className="task-card">
      <p>{task.text}</p>
      <button onClick={() => removeTask(task.id)} className="remove-task">
        Delete
      </button>
    </div>
  );
};

export default TaskCard;
