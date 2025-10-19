import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

const TaskList = () => {
  const { tasks, removeTask } = useContext(TaskContext);

  return (
    <div className="task-list-container">
      <h1>Your Tasks</h1>
      <TaskForm />
      <div className="task-cards">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} removeTask={removeTask} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
