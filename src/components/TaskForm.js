import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import CategorySelect from './CatagorySelect'
import '../styles/TaskForm.css';

const TaskForm = () => {
  const [taskText, setTaskText] = useState('');
  const [category, setCategory] = useState('General');
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    addTask({ text: taskText.trim(), category });
    setTaskText('');
    setCategory('General');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task"
        className="task-input"
      />
      <CategorySelect value={category} onChange={setCategory} className="task-category" />
      <button type="submit" className="task-submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
