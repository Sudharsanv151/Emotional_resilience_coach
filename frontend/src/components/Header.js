import React from 'react';
import './Header.css';

function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          <h1>AI-Powered Emotional Resiliece Coach</h1>
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#survey">Survey</a></li>
          <li><a href="#recommendations">Recommendations</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
