import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import TaskList from './pages/TaskList';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { TaskProvider } from './context/TaskContext'; // Import TaskContext
import './App.css';

function App() {
  return (
    <TaskProvider>
      <Router>
        <Navbar /> {/* Include Navbar */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <TaskForm /> {/* Include TaskForm */}
        <Footer /> {/* Include Footer */}
      </Router>
    </TaskProvider>
  );
}

export default App;
