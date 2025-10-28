import React from 'react';
import './Footer.css';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Footer = () => {
  const { user } = useContext(AuthContext);
  if (!user) return null; 

    <footer className="footer">
      <p>© 2025 My Todo List App. All Rights Reserved.</p>
    </footer>
  ;
};

export default Footer;
