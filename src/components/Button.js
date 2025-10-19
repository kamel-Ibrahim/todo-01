// src/components/Button.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css'; // Import button styles

const Button = ({ text, link }) => {
  return (
    <Link to={link} className={styles.button}>
      {text}
    </Link>
  );
};

export default Button;
