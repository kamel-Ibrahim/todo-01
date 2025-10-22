import React, { useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState({
    name: 'Tala',
    email: 'tala@example.com',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated!');
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
          />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
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
