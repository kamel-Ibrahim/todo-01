import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const TaskCard = ({ task }) => {
  const { removeTask, toggleDone, updateTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [category, setCategory] = useState(task.category || 'General');

  const save = () => {
    const t = text.trim();
    if (!t) return;
    updateTask(task.id, { text: t, category });
    setIsEditing(false);
  };

  return (
    <div className={`task-card ${task.done ? 'done' : ''}`}>
      <div className="task-main">
        <input type="checkbox" checked={task.done} onChange={() => toggleDone(task.id)} aria-label="mark done" />
        {isEditing ? (
          <input value={text} onChange={(e)=>setText(e.target.value)} className="task-edit-input" />
        ) : (
          <p className="task-text">{task.text}</p>
        )}
        <span className="task-category-badge">{task.category || 'General'}</span>
      </div>
      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="btn" onClick={save}>Save</button>
            <button className="btn" onClick={()=>setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn" onClick={()=>setIsEditing(true)}>Edit</button>
            <button className="btn danger" onClick={()=>removeTask(task.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
