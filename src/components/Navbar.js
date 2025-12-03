// src/components/Navbar.js
import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const auth = useContext(AuthContext);
  const user = auth && auth.user ? auth.user : null;

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close the menu every time the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  if (!user) return null;

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className={`navbar ${isOpen ? 'navbar-open' : ''}`}>
      <div className="navbar-inner">
        <div className="nav-brand">
          <span className="nav-brand-mark" />
          <Link to="/" className="nav-brand-link">
            TaskFlow
          </Link>
        </div>

        <button
          type="button"
          className={`nav-toggle ${isOpen ? 'is-open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>

        <ul className={`nav-list ${isOpen ? 'nav-list-open' : ''}`}>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/tasks" className="nav-link">Tasks</Link></li>
          <li><Link to="/achievements" className="nav-link">Achievements</Link></li>
          <li><Link to="/profile" className="nav-link">Profile</Link></li>
          <li><Link to="/logout" className="nav-link">Logout</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
