// simple sidebar; uses NavLink to highlight active
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    logout();
    navigate("/login");
  }

  return (
    <aside className="sidebar">
      <div className="logo">
        <div style={{ width: 42, height: 42, borderRadius: 8, background: "linear-gradient(90deg,var(--accent-1),var(--accent-2))" }} />
        <div style={{ marginLeft: 8 }}>
          <div style={{ fontWeight: 700 }}>Edu ERP</div>
          <div className="small kicker">University - Desktop</div>
        </div>
      </div>

      <nav className="nav">
        <NavLink to="/" end>Home</NavLink>
        {user && user.role === "student" && <NavLink to="/student-dashboard">My Dashboard</NavLink>}
        {user && user.role === "teacher" && <NavLink to="/teacher-dashboard">My Dashboard</NavLink>}
        {user && user.role === "admin" && <NavLink to="/admin">Admin Dashboard</NavLink>}

        <NavLink to="/students">Students</NavLink>
        <NavLink to="/teachers">Teachers</NavLink>
      </nav>

      <div style={{ padding: 18 }}>
        <button className="btn" onClick={handleSignOut}>Sign out</button>
      </div>
    </aside>
  );
}
