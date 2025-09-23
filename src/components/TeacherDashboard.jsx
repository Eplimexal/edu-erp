// src/components/TeacherDashboard.jsx
import React from 'react';
import './StudentDashboard.css'; // <-- Import the Student Dashboard's CSS

const TeacherDashboard = ({ currentUser }) => {
  // It's a good practice to handle cases where the prop might be missing
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <header className="navbar">
        <h1 className="logo">Teacher Dashboard</h1>
        <nav>
          <ul className="nav-links">
            <li>Profile</li>
            <li>Notifications</li>
            <li>Logout</li>
          </ul>
        </nav>
      </header>

      {/* Layout: Sidebar Left + Main Content */}
      <div className="dashboard-content">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <ul>
            <li>My Classes</li>
            <li>Counselling student list</li>
            <li>Grades</li>
            <li>Announcements</li>
            <li>CRT Module</li>
            <li>Feedback</li>
          </ul>
        </aside>

        {/* Main Section */}
        <main className="main-section">
          <h2>Welcome, {currentUser.name}!</h2>
          <p>Select an option from the menu on the left.</p>
        </main>
      </div>
    </div>
  );
}

export default TeacherDashboard;