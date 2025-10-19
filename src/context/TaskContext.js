import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [pastTasks, setPastTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (taskId) => {
    const taskToRemove = tasks.find((task) => task.id === taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
    setPastTasks([...pastTasks, taskToRemove]); // Add to past tasks
  };

  return (
    <TaskContext.Provider value={{ tasks, pastTasks, addTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};
