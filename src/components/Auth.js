import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Get all stored users
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const user = storedUsers.find(u => u.email === formData.email);

        if (!user) {
          throw new Error('No account found with this email.');
        }

        if (user.password !== formData.password) {
          throw new Error('Incorrect password.');
        }

        // Store the current user info without password
        const userData = {
          username: user.username,
          email: user.email
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        onLogin(userData);
        navigate('/home');
      } else {
        // Registration
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }

        // Get all stored users
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if email already exists
        if (storedUsers.some(u => u.email === formData.email)) {
          throw new Error('Email already registered. Please login instead.');
        }

        // Add new user to the list
        storedUsers.push(formData);
        localStorage.setItem('users', JSON.stringify(storedUsers));

        // Switch to login form after successful registration
        setIsLogin(true);
        setFormData({ ...formData, password: '' });
        setError('Registration successful! Please login.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-content">
          <h1>StudentGuide</h1>
          <p>Discover your perfect career path and connect with mentors who can guide your journey.</p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-box">
          <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Sign in to continue your career journey' 
              : 'Start your journey to career success'}
          </p>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username"
                />
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="submit-button">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
          <p className="switch-form">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              className="switch-button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({
                  username: '',
                  email: '',
                  password: ''
                });
              }}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth; 