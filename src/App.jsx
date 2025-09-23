import { useState } from "react";
import AdminDashboard from "./components/AdminDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";
import AdministratorDashboard from "./components/AdministratorDashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("login");

  const handleRegister = (user) => {
    setUsers([...users, user]);
    setPage("login");
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

const renderDashboard = () => {
  switch (currentUser.role) {
    case "admin":
      return <AdminDashboard currentUser={currentUser} />;
    case "teacher":
      return <TeacherDashboard currentUser={currentUser} />; // Pass the currentUser prop here
    case "student":
      return <StudentDashboard currentUser={currentUser} />;
    case "administrator":
      return <AdministratorDashboard currentUser={currentUser} />;
    default:
      return <h2>No dashboard found</h2>;
  }
};

  // If not logged in → show Login/Register card
  if (!currentUser) {
    return (
      <div className="center-container">
        <div className="card">
          <h1>Educational ERP System</h1>
          {page === "login" ? (
            <>
              <Login users={users} onLogin={handleLogin} />
              <p>
                Don’t have an account?{" "}
                <button
                  className="link-btn"
                  onClick={() => setPage("register")}
                >
                  Register
                </button>
              </p>
            </>
          ) : (
            <>
              <Register onRegister={handleRegister} />
              <p>
                Already have an account?{" "}
                <button
                  className="link-btn"
                  onClick={() => setPage("login")}
                >
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  // If logged in → show dashboards full width
  return (
    <div className="dashboard-wrapper">
      <h1>Welcome, {currentUser.name}</h1>
      {renderDashboard()}
      <button className="logout-btn" onClick={() => setCurrentUser(null)}>
        Logout
      </button>
    </div>
   
  );
}

export default App;
