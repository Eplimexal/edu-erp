import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import StudentDashboard from '../components/StudentDashboard';
import TeacherDashboard from '../components/TeacherDashboard';

export default function UniversityERP() {
  const [currentPage, setCurrentPage] = useState('login');
  const [userType, setUserType] = useState('student');
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (email, password) => {
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }

    const user = users.find(u => u.email === email && u.userType === userType);
    
    if (!user) {
      setErrorMessage('No account found. Please register first.');
      return;
    }

    if (user.password !== password) {
      setErrorMessage('Invalid password. Please try again.');
      return;
    }

    setCurrentUser(user);
    setCurrentPage('dashboard');
    setErrorMessage('');
  };

  const handleRegister = (data) => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (data.password !== data.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (data.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    const existingUser = users.find(u => u.email === data.email);
    if (existingUser) {
      setErrorMessage('Email already registered. Please login.');
      return;
    }

    setUsers([...users, {
      name: data.name,
      email: data.email,
      password: data.password,
      userType: data.userType
    }]);

    setSuccessMessage('Registration successful! You can now login.');
    setTimeout(() => {
      setCurrentPage('login');
      setSuccessMessage('');
      setErrorMessage('');
    }, 1500);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    setErrorMessage('');
  };

  return (
    <div>
      {currentPage === 'login' && (
        <Login 
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setCurrentPage('register');
            setErrorMessage('');
          }}
          userType={userType}
          setUserType={setUserType}
          errorMessage={errorMessage}
        />
      )}
      
      {currentPage === 'register' && (
        <Register 
          onRegister={handleRegister}
          onSwitchToLogin={() => {
            setCurrentPage('login');
            setErrorMessage('');
            setSuccessMessage('');
          }}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      )}
      
      {currentPage === 'dashboard' && userType === 'student' && (
        <StudentDashboard onLogout={handleLogout} userData={currentUser} />
      )}
      
      {currentPage === 'dashboard' && userType === 'teacher' && (
        <TeacherDashboard onLogout={handleLogout} userData={currentUser} />
      )}
    </div>
  );
}
