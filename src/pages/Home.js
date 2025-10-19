import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';  // Import TaskForm

const Home = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="home-container">
      <h1>Current Tasks</h1>
      <TaskForm />  {/* Display the TaskForm component */}
      {tasks.length === 0 ? (
        <p>No tasks yet. Please add some!</p>
      ) : (
        tasks.map(task => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
};

export default Home;
