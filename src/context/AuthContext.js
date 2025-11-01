import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  //Loads the current logged-in user when app starts
  useEffect(() => {
    const current = localStorage.getItem("currentUser");
    if (current) {
      const users = JSON.parse(localStorage.getItem("users")) || {};
      setUser(users[current] || null);
    }
  }, []);

  //registers new LAU user
  const register = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) throw new Error("User already exists.");

    users[email] = {
      name,
      email,
      password,
      tasks: [] // placeholder for your teammates’ work later
    };

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", email);
    setUser(users[email]);
  };

  //Logs in existing user
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[email]) throw new Error("User not found.");
    if (users[email].password !== password)
      throw new Error("Incorrect password.");

    localStorage.setItem("currentUser", email);
    setUser(users[email]);
  };

  //Logs out and keep data saved
  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  //Updates user profile (for Profile page later)
  const updateProfile = (updates) => {
    if (!user) return;
    const users = JSON.parse(localStorage.getItem("users")) || {};
    users[user.email] = { ...users[user.email], ...updates };
    localStorage.setItem("users", JSON.stringify(users));
    setUser(users[user.email]);
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
