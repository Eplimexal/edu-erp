import "./StudentDashboard.css";

function StudentDashboard() {
  return (
    <div className="dashboard-outer">
      <div className="dashboard-card">
        {/* Full-width blue navbar at the top */}
        <div className="navbar">
          <span className="nav-title"><b>Welcome, Rohan Koganti</b></span>
          <ul className="nav-links">
            <li className="active">Student Dashboard</li>
            <li>Profile</li>
            <li>Notifications</li>
            <li>Logout</li>
          </ul>
        </div>
        <div className="dashboard-content">
          {/* Sidebar menu on the left */}
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
          {/* Main section centered */}
          <main className="main-section">
            <div className="welcome-center">
              <h2>Welcome, Student!</h2>
              <p>Select an option from the menu on the left.</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
