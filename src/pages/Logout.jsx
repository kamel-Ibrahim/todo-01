import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    // send users back to Register after logging out
    navigate('/register', { replace: true });
  }, [logout, navigate]);

  return (
    <div className="page-wrap">
      <h1>Logging out…</h1>
      <p>You’ll be redirected shortly.</p>
    </div>
  );
}
