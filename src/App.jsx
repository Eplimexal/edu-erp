import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import NotFound from './pages/NotFound';
import { useAuth } from './context/AuthContext';

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<div style={{ padding: 20 }}>Use sidebar to navigate</div>} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="student-dashboard" element={<StudentDashboard />} />
        <Route path="teacher-dashboard" element={<TeacherDashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
