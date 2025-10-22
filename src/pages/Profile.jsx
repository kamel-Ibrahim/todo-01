import React, { useState } from 'react';
import Button from '../components/Button'; // Import the Button component
import '../styles/Profile.css' 

export default function Profile() {
  const [user, setUser] = useState({
    name: 'Tala',
    email: 'tala@example.com',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSave = () => {
    // Validate email before saving
    if (!validateEmail(user.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');
    setIsEditing(false);
    alert('Profile updated!');
  };

  const handleDelete = () => {
    alert('Profile deleted!');
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      {isEditing ? (
        <div>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Enter your name"
            className="input-field"  // Apply class for styling
          />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
            className="input-field"  // Apply class for styling
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          <Button label="Save" onClick={handleSave} type="primary" />
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <Button label="Edit" onClick={() => setIsEditing(true)} type="primary" />
          <Button label="Delete" onClick={handleDelete} type="delete" />
        </div>
      )}
    </div>
  );
}
