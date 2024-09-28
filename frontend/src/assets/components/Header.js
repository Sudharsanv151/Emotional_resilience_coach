import React, { useState } from 'react';
import '../css/Header.css'
import Login from './Login'; // Import the login modal

function Header() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true); // Show the login modal when clicked
  };

  const handleCloseLogin = () => {
    setShowLogin(false); // Close the login modal
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <h1>AI-Powered Emotional Resilience Coach</h1>
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#survey">Survey</a></li>
          <li><a href="#recommendations">Recommendations</a></li>
          <li><a href="#about">About</a></li>
          <li  style=" font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
            Login
          </li> {/* Login link that triggers the modal */}
        </ul>
      </nav>
      {showLogin && <Login onClose={handleCloseLogin} />} {/* Conditionally render the login modal */}
    </header>
  );
}

export default Header;
