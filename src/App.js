import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext'; // Import TaskProvider
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import TaskForm from './components/TaskForm';
import Button from './components/Button';
import './App.css';

function App() {
  return (
    <TaskProvider> {/* Wrap the app in TaskProvider */}
      <Router>
        <div className="app-container">
          <Button text="Go to Home" link="/" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskList />} />
          </Routes>
          <TaskForm />
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;
