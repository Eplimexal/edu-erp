import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import "./styles/app.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "var(--accent-1)",
            borderRadius: "8px",
          }}
        ></div>
        <div>
          <strong>Edu ERP</strong>
          <div className="small">University - Desktop</div>
        </div>
      </div>
      <div className="nav">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/dashboard">My Dashboard</NavLink>
        <NavLink to="/students">Students</NavLink>
        <NavLink to="/teachers">Teachers</NavLink>
      </div>
      <button className="btn" style={{ marginTop: "auto" }}>
        Sign out
      </button>
    </div>
  );
}

function Home() {
  return (
    <div className="content">
      <div className="card">
        <h2>Welcome back</h2>
        <p>Here’s a summary of the system</p>
        <p>Signed in as <b>rohan</b></p>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="content">
      <div className="card">
        <h2>My Dashboard</h2>
        <p>Work in progress, but navigation works 👌</p>
      </div>
    </div>
  );
}

function Students() {
  return (
    <div className="content">
      <div className="card">
        <h2>Students</h2>
        <p>List of students, attendance, grades etc. will appear here soon.</p>
      </div>
    </div>
  );
}

function Teachers() {
  return (
    <div className="content">
      <div className="card">
        <h2>Teachers</h2>
        <p>Manage teacher data, timetables, and more.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main">
        <div className="header">
          <input
            type="text"
            className="input search"
            placeholder="Search students, teachers, courses..."
          />
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>Theme: system (dark)</span>
            <button className="btn">Toggle</button>
            <span>rohan</span>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/teachers" element={<Teachers />} />
        </Routes>
      </div>
    </div>
  );
}
