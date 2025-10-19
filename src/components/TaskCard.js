import React from 'react';

const TaskCard = ({ task, removeTask }) => {
  if (!task) return null; // Handle missing task gracefully

  return (
    <div className="task-card">
      <p>{task.text}</p>
      {/* Only show the delete button if removeTask is passed as a prop */}
      {removeTask && (
        <button onClick={() => removeTask(task.id)} className="remove-task">
          Delete
        </button>
      )}
    </div>
  );
};

export default TaskCard;
