import React from 'react';

const TaskCard = ({ task, removeTask }) => {
  if (!task) return null; // Handle missing task gracefully

  return (
    <div className="task-card">
      <p>{task.text}</p>
      {removeTask && (
        <button onClick={() => removeTask(task.id)} className="remove-task">
          Delete
        </button>
      )}
    </div>
  );
};

export default TaskCard;
