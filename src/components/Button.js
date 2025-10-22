import React from 'react';

// Button component that takes label, onClick handler, and style type
const Button = ({ label, onClick, type = 'primary' }) => {
  const buttonStyles = {
    primary: {
      backgroundColor: '#4CAF50', // Green for Save
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      margin: '10px 0',
    },
    delete: {
      backgroundColor: '#f44336', // Red for Delete
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      margin: '10px 0',
    },
  };

  return (
    <button
      onClick={onClick}
      style={type === 'delete' ? buttonStyles.delete : buttonStyles.primary}
    >
      {label}
    </button>
  );
};

export default Button;
