import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';

const Home = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="home-container">
      <h1>Current Tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks yet. Please add some!</p>
      ) : (
        tasks.map(task => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
};

export default Home;
