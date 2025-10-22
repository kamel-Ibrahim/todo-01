import React from 'react';

const Button = ({ label, onClick, type = 'primary' }) => {
  const pomeColor = getComputedStyle(document.documentElement).getPropertyValue('--pome').trim();
  


  const mintColor = getComputedStyle(document.documentElement).getPropertyValue('--mint').trim();


  const buttonStyles = {
    primary: {
      backgroundColor: mintColor || '#4CAF50',  
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      margin: '10px 10px',
    },
    delete: {
      backgroundColor: pomeColor || '#f44336',  
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      margin: '10px 10px',
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
