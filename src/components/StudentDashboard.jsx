import "./StudentDashboard.css";

function StudentDashboard() {
  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <header className="navbar">
        <h1 className="logo">Student Dashboard</h1>
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
            <li>Academic Records</li>
            <li>Attendance</li>
            <li>Courses</li>
            <li>Clubs & Activities</li>
            <li>Exam Section</li>
            <li>Fee Payments</li>
            <li>Library</li>
            <li>Time Tables</li>
            <li>Feedback</li>
          </ul>
        </aside>

        {/* Main Section */}
        <main className="main-section">
          <h2>Welcome, Student!</h2>
          <p>Select an option from the menu on the left.</p>
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;
