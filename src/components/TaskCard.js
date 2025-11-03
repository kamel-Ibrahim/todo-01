//import React, { useState, useContext } from 'react';
//import { TaskContext } from '../context/TaskContext';

//const TaskCard = ({ task }) => {
//  const { removeTask, toggleDone, updateTask } = useContext(TaskContext);
//  const [isEditing, setIsEditing] = useState(false);
//  const [text, setText] = useState(task.text);
//  const [category, setCategory] = useState(task.category || 'General');

//  const save = () => {
//    const t = text.trim();
//    if (!t) return;
//    updateTask(task.id, { text: t, category });
//    setIsEditing(false);
//  };

//  return (
//    <div className={`task-card ${task.done ? 'done' : ''}`}>
//      <div className="task-main">
//        <input type="checkbox" checked={task.done} onChange={() => toggleDone(task.id)} aria-label="mark done" />
//        {isEditing ? (
//          <input value={text} onChange={(e)=>setText(e.target.value)} className="task-edit-input" />
//        ) : (
//          <p className="task-text">{task.text}</p>
//        )}
//        <span className="task-category-badge">{task.category || 'General'}</span>
//      </div>
//      <div className="task-actions">
//        {isEditing ? (
//          <>
//            <button className="btn" onClick={save}>Save</button>
//            <button className="btn" onClick={()=>setIsEditing(false)}>Cancel</button>
//          </>
//        ) : (
//          <>
//            <button className="btn" onClick={()=>setIsEditing(true)}>Edit</button>
//            <button className="btn danger" onClick={()=>removeTask(task.id)}>Delete</button>
//          </>
//        )}
//      </div>
//    </div>
//  );
//};

//export default TaskCard;

import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskCard = ({ task }) => {
    const { removeTask, toggleDone, updateTask } = useContext(TaskContext);
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(task.title);
    const [category, setCategory] = useState(task.category || "General");
    const [description, setDescription] = useState(task.description || "");

    const save = () => {
        const t = text.trim();
        if (!t) return;
        updateTask(task.id, { title: t, description, category });
        setIsEditing(false);
    };

    const toggleSubtask = (subId) => {
        const updatedSubs = task.subtasks.map((s) =>
            s.id === subId ? { ...s, done: !s.done } : s
        );
        updateTask(task.id, { subtasks: updatedSubs });
    };

    return (
        <div className={`task-card ${task.done ? "done" : ""}`}>
            <div className="task-main">
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleDone(task.id)}
                    aria-label="mark done"
                />

                {isEditing ? (
                    <>
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="task-edit-input"
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="task-edit-desc"
                            placeholder="Description"
                        />
                    </>
                ) : (
                    <div className="task-content">
                        <p className="task-text">{task.title}</p>
                        {task.description && (
                            <p className="task-desc">{task.description}</p>
                        )}
                    </div>
                )}

                <span className="task-category-badge">
                    {task.category || "General"}
                </span>
            </div>

            {/* Subtasks */}
            {task.subtasks && task.subtasks.length > 0 && (
                <ul className="subtask-list">
                    {task.subtasks.map((sub) => (
                        <li key={sub.id}>
                            <input
                                type="checkbox"
                                checked={sub.done}
                                onChange={() => toggleSubtask(sub.id)}
                            />
                            <span className={sub.done ? "subtask-done" : ""}>{sub.text}</span>
                        </li>
                    ))}
                </ul>
            )}

            <div className="task-actions">
                {isEditing ? (
                    <>
                        <button className="btn" onClick={save}>
                            Save
                        </button>
                        <button className="btn" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button className="btn" onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                        <button className="btn danger" onClick={() => removeTask(task.id)}>
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
