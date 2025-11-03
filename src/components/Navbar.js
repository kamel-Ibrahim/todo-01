import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  if (!user) return null; 

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/tasks" className="nav-link">Tasks</Link></li>
        <li><Link to="/past-tasks" className="nav-link">Past Tasks</Link></li>
        <li><Link to="/profile" className="nav-link">Profile</Link></li>
        <li><Link to="/logout" className="nav-link">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
