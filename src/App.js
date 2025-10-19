import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import Profile from './pages/Profile';
import PastTasks from './pages/PastTasks';
import './styles/App.css'; // Import global CSS

function App() {
  return (
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
  );
}

export default App;
