import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './styles/app.css';
import { ThemeProvider } from './context/ThemeContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      {/* app-bg wraps the entire UI so backgrounds/overlays show everywhere */}
      <div className="app-bg">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  </React.StrictMode>
);
