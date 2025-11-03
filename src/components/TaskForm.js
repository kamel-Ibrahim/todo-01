
import React, { useState } from "react";
import "../styles/TaskForm.css"; 

function AddTaskForm({ addTask }) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [subtasks, setSubtasks] = useState([]);
    const [subtaskInput, setSubtaskInput] = useState("");

    const handleAddSubtask = () => {
        if (subtaskInput.trim()) {
            setSubtasks([
                ...subtasks,
                { id: Date.now(), text: subtaskInput.trim(), done: false },
            ]);
            setSubtaskInput("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !category.trim()) return;

        addTask({
            id: Date.now(),
            title: title.trim(),
            description: description.trim(),
            category: category.trim(),
            subtasks,
            done: false,
        });

        // Reset form
        setTitle("");
        setCategory("");
        setDescription("");
        setSubtasks([]);
    };

    return (
        <form onSubmit={handleSubmit} className="add-task-form">
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
            />

            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field"
            />

            <textarea
                placeholder="Task description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea-field"
            />

            {/* Subtask Input Section */}
            <div className="subtask-container">
                <input
                    type="text"
                    placeholder="Add subtask"
                    value={subtaskInput}
                    onChange={(e) => setSubtaskInput(e.target.value)}
                    className="subtask-input-field"
                />
                <button
                    type="button"
                    onClick={handleAddSubtask}
                    className="subtask-add-btn"
                >
                    ➕
                </button>
            </div>

            {/* Subtask Preview */}
            {subtasks.length > 0 && (
                <ul className="subtask-list-preview">
                    {subtasks.map((st) => (
                        <li key={st.id} className="subtask-preview-item">
                            {st.text}
                        </li>
                    ))}
                </ul>
            )}

            <button type="submit" className="submit-btn">
                Add Task
            </button>
        </form>
    );
}

export default AddTaskForm;
