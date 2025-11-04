import React, { useState, useContext, useEffect, useMemo } from "react";
import { TaskContext } from "../context/TaskContext";
import "../components/TaskCard.css";

const TaskCard = ({ task }) => {
    const [now, setNow] = useState(Date.now());
    useEffect(()=>{ const t = setInterval(()=>setNow(Date.now()), 30000); return ()=>clearInterval(t); },[]);
    const dueDiff = useMemo(()=>{
        if (!task.dueAt) return null;
        const due = typeof task.dueAt === 'number' ? task.dueAt : Date.parse(task.dueAt);
        return Number.isFinite(due) ? (due - now) : null;
    }, [task.dueAt, now]);

    const dueLabel = useMemo(()=>{
        if (dueDiff == null) return null;
        const abs = Math.abs(dueDiff);
        const mins = Math.round(abs/60000);
        if (dueDiff < 0) return `Overdue by ${mins} min`;
        if (mins < 60) return `Due in ${mins} min`;
        const hours = Math.round(mins/60);
        if (hours < 24) return `Due in ${hours} hr`;
        const days = Math.round(hours/24);
        return `Due in ${days} day${days>1?'s':''}`;
    }, [dueDiff]);

    const dueClass = useMemo(()=>{
        if (dueDiff == null) return 'ok';
        if (dueDiff <= 0) return 'urgent';
        if (dueDiff <= 10*60*1000) return 'urgent';
        if (dueDiff <= 60*60*1000) return 'soon';
        return 'ok';
    }, [dueDiff]);
    
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
            {/* Category badge */}
            <span className={`task-category ${task.category || "General"}`}>
                {task.category || "General"}
            </span>

            <div className="task-main">
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleDone(task.id)}
                    aria-label="mark done"
                    className="task-checkbox"
                />

                {isEditing ? (
                    <div className="edit-section">
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="task-edit-input"
                            placeholder="Task title"
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="task-edit-desc"
                            placeholder="Description (optional)"
                        />
                    </div>
                ) : (
                    <div className="task-content">
                        <h3 className="task-title">{task.title}</h3>
                        {task.description && task.description.trim() !== "" && (
                            <p className="task-desc">{task.description}</p>
                        )}
                    </div>
                )}
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

            {/* Actions */}
            <div className="task-actions">
                {isEditing ? (
                    <>
                        <button className="btn" onClick={save}>Save</button>
                        <button className="btn cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button className="btn edit" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="btn danger" onClick={() => removeTask(task.id)}>Delete</button>
                    </>
                )}
            </div>
        
        {dueLabel && (<div className={`task-due ${dueClass}`}>{dueLabel}</div>)}
    </div>
    );
};

export default TaskCard;
