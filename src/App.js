import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import PastTasks from './pages/PastTasks';
import { TaskProvider } from './context/TaskContext';
import { AuthProvider } from './context/AuthContext';   // added by tala
import './styles/App.css';

function App() {
  return (
    <TaskProvider>
      <AuthProvider>   {/*new wrapper for authentication(tala) */}
        <Router>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/past-tasks" element={<PastTasks />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </AuthProvider>
    </TaskProvider>
  );
}

export default App;
