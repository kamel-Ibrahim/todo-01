import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import TaskList from "./pages/TaskList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PastTasks from "./pages/PastTasks";
import Logout from "./pages/Logout"; // <-- added

import { TaskProvider } from "./context/TaskContext";
import { CategoryProvider } from "./context/CategoryContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import "./styles/App.css";

/* -------- Route Guards -------- */
function ProtectedRoute({ children }) {
  const { user } = React.useContext(AuthContext);
  if (!user) return <Navigate to="/register" replace />;
  return children;
}

function PublicOnlyRoute({ children }) {
  const { user } = React.useContext(AuthContext);
  if (user) return <Navigate to="/" replace />;
  return children;
}
/* -------------------------------- */

function App() {
  return (
    <CategoryProvider>
      <TaskProvider>
        <AuthProvider>
          <Router>
            <Navbar />
            <div className="main-content">
              <Routes>
                {/* Public-first */}
                <Route
                  path="/register"
                  element={
                    <PublicOnlyRoute>
                      <Register />
                    </PublicOnlyRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicOnlyRoute>
                      <Login />
                    </PublicOnlyRoute>
                  }
                />

                {/* Protected app */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tasks"
                  element={
                    <ProtectedRoute>
                      <TaskList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/past-tasks"
                  element={
                    <ProtectedRoute>
                      <PastTasks />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/logout"
                  element={
                    <ProtectedRoute>
                      <Logout />
                    </ProtectedRoute>
                  }
                />

                {/* Anything else → Register */}
                <Route path="*" element={<Navigate to="/register" replace />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </AuthProvider>
      </TaskProvider>
    </CategoryProvider>
  );
}

export default App;
