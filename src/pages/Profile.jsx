import React, { useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState({
    name: 'Tala',
    email: 'tala@example.com',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSave = () => {
    // Validate email 
    if (!validateEmail(user.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    setIsEditing(false);
    alert('Profile updated!');
  };

  const validateEmail = (email) => {
    // Simple email validation using regex
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
          />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}
