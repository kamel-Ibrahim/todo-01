import React from 'react';

const TaskCard = ({ task, removeTask }) => {
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
