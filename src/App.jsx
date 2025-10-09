import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      {/* background element: keep DOM order such that app-shell is rendered after */}
      <div className="app-bg" />
      <div className="app-shell">
        <Sidebar />
        <div className="main">
          <Topbar />
          <main style={{ padding: 18 }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin-login" element={<AdminLogin />} />

              {/* protected routes */}
              <Route path="/student-dashboard" element={<RequireRole role="student"><StudentDashboard /></RequireRole>} />
              <Route path="/teacher-dashboard" element={<RequireRole role="teacher"><TeacherDashboard /></RequireRole>} />
              <Route path="/admin" element={<RequireRole role="admin"><AdminDashboard /></RequireRole>} />

              <Route path="/" element={<Navigate to="/student-dashboard" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

function RequireRole({ children, role }) {
  const { user } = useAuth();
  if (!user) {
    // not logged in
    return <Navigate to="/login" replace />;
  }
  if (role && user.role !== role) {
    // wrong role
    return <div style={{ padding: 24 }}><h3>Access denied</h3><p>You don’t have access to this page.</p></div>;
  }
  return children;
}
