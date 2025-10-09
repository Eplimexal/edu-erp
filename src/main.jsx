import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './styles/app.css';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <div className="app-bg">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
