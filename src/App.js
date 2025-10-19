import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import TaskForm from './components/TaskForm';
import Button from './components/Button';
import Navbar from './components/Navbar';  // Import Navbar
import Footer from './components/Footer';  // Import Footer
import Profile from './pages/Profile'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar /> 
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/profile" element={<Profile />} />

            {/* Add more pages like Profile if needed */}
          </Routes>
        </div>
        
        <Footer /> {/* Include Footer */}
      </div>
    </Router>
  );
}

export default App;
