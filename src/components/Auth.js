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
        // Simulate login
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          throw new Error('No account found. Please sign up first.');
        }

        const user = JSON.parse(storedUser);
        if (user.email !== formData.email || user.password !== formData.password) {
          throw new Error('Invalid email or password');
        }

        // Store the user info
        localStorage.setItem('currentUser', JSON.stringify({
          username: user.username,
          email: user.email
        }));

        onLogin({ username: user.username, email: user.email });
        navigate('/home');
      } else {
        // Simulate registration
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }

        // Store the new user
        localStorage.setItem('user', JSON.stringify(formData));

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
            <button type="submit" className="auth-button">
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