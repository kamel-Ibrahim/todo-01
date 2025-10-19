import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';

const TaskList = () => {
  const { tasks, removeTask } = useContext(TaskContext);

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="no-tasks-message">No tasks available, please add some tasks!</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} removeTask={removeTask} />
        ))
      )}
    </div>
  );
};

export default TaskList;
