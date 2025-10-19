import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import Profile from './pages/Profile';
import PastTasks from './pages/PastTasks';
import { TaskProvider } from './context/TaskContext';
import './styles/App.css';

function App() {
  return (
    <TaskProvider> {/* Wrap everything inside TaskProvider */}
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/past-tasks" element={<PastTasks />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </TaskProvider>
  );
}

export default App;
