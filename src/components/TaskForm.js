import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext'; // Ensure TaskContext is correctly imported

const TaskForm = () => {
  const [taskText, setTaskText] = useState('');
  const { addTask } = useContext(TaskContext); // Destructure addTask properly

  // Check if addTask is defined before using it
  if (!addTask) {
    return <div>Error: addTask is not available!</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText) return;

    // Add task with a proper ID and text
    addTask({ id: Date.now(), text: taskText });
    setTaskText('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task"
        className="task-input"
      />
      <button type="submit" className="task-submit">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
