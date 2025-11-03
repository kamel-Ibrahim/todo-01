import React, { useState } from "react";
import "../styles/App.css";

const FIXED_CATEGORIES = ["General", "School", "Work", "Personal"];

function AddTaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(FIXED_CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskInput, setSubtaskInput] = useState("");
  const [dueAt, setDueAt] = useState("");

  const handleAddSubtask = () => {
    if (!subtaskInput.trim()) return;
    setSubtasks([...subtasks, { id: Date.now(), text: subtaskInput.trim(), done: false }]);
    setSubtaskInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      category,
      subtasks,
      done: false,
      dueAt: dueAt ? Date.parse(dueAt) : null,
    });

    setTitle("");
    setDescription("");
    setSubtasks([]);
    setSubtaskInput("");
    setDueAt("");
    setCategory(FIXED_CATEGORIES[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <div className="form-grid">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field"
        >
          {FIXED_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <div className="subtask-inline">
          <input
            type="text"
            placeholder="Add subtask"
            value={subtaskInput}
            onChange={(e) => setSubtaskInput(e.target.value)}
            className="input-field"
          />
          <button type="button" onClick={handleAddSubtask} className="btn btn-secondary">+</button>
        </div>

        <div className="date-inline">
          <input
            type="datetime-local"
            value={dueAt}
            onChange={(e) => setDueAt(e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea-field"
      />

      {subtasks.length > 0 && (
        <ul className="subtask-list-preview">
          {subtasks.map((st) => (
            <li key={st.id} className="subtask-preview-item">
              {st.text}
            </li>
          ))}
        </ul>
      )}

      <div className="actions-row">
        <button type="submit" className="btn btn-primary">Add Task</button>
      </div>
    </form>
  );
}

export default AddTaskForm;
