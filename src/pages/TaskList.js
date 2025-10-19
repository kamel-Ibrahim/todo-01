import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';

const TaskList = () => {
  const { tasks, removeTask } = useContext(TaskContext); // Access tasks and removeTask from context

  return (
    <div className="task-list-container">
      <h1>Your Tasks</h1>
      <div className="task-cards">
        {tasks.length === 0 ? (
          <p>No tasks available. Please add some tasks!</p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} removeTask={removeTask} />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
