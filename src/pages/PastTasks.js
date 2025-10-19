import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';

const PastTasks = () => {
  const { pastTasks } = useContext(TaskContext);  // Use pastTasks from context

  return (
    <div className="past-tasks-container">
      <h1>Past Tasks</h1>
      {pastTasks.length === 0 ? (
        <p>No past tasks found.</p>
      ) : (
        pastTasks.map((task) => (
          <TaskCard key={task.id} task={task} />  
        ))
      )}
    </div>
  );
};

export default PastTasks;
