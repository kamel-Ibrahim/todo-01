import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import styles for the navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/tasks" className="nav-link">Tasks</Link></li>
        <li><Link to="/profile" className="nav-link">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
