import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import TaskList from "./pages/TaskList";
import Achievements from "./pages/Achievements";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { TaskProvider } from "./context/TaskContext";
import { CategoryProvider } from "./context/CategoryContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext) || {};
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <TaskProvider>
          {/* Router is provided in index.js, so just render Routes here */}
          <Navbar />
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
            <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
          <Footer />
        </TaskProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}
