import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const TaskForm = () => {
  const [taskText, setTaskText] = useState('');
  const { addTask } = useContext(TaskContext); // Access the addTask function from context

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return; // Don't add empty tasks
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
