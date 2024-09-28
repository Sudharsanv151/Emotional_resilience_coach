import React, { useState } from 'react';
import '../css/Login.css'; // Add your styling here

function LoginModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      onClose(); // Close the modal on successful login
    } catch (err) {
      setError('Invalid credentials, please try again.');
    }
  };

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Reset the state after successful registration and switch back to login
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setIsRegistering(false); // Go back to login form after successful registration
    } catch (err) {
      setError('Registration failed, please try again.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-icon" onClick={onClose}>&times;</button>

        {isRegistering ? (
          <>
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleRegister} className="form-container">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Password:</label>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <label>Confirm Password:</label>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <button type="submit" className="submit-btn">Register</button>
            </form>
            <p>Already have an account? <button className="switch-mode-btn" onClick={() => setIsRegistering(false)}>Login here</button></p>
          </>
        ) : (
          <>
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin} className="form-container">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Password:</label>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <button type="submit" className="submit-btn">Login</button>
            </form>
            <p>Don't have an account? <button className="switch-mode-btn" onClick={() => setIsRegistering(true)}>Register here</button></p>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
