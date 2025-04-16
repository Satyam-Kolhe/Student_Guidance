import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.classList.contains("hamburger-icon") &&
        !event.target.parentElement.classList.contains("hamburger-icon")
      ) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("quizCompleted");
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Don't show navbar on login/signup page
  if (location.pathname === "/" && !currentUser) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/home">
          <div className="logo">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">StudentGuide</span>
          </div>
        </Link>
      </div>

      <div className="hamburger-icon" onClick={toggleMobileMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </div>

      <div
        className={`nav-container ${mobileMenuOpen ? "active" : ""}`}
        ref={mobileMenuRef}
      >
        <div className="nav-links">
          <Link
            to="/home"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/quiz"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Career Quiz
          </Link>
          <Link
            to="/recommendations"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Recommendations
          </Link>
          <Link
            to="/mentors"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Mentorship
          </Link>
        </div>
      </div>

      <div className="auth-section" ref={dropdownRef}>
        {currentUser && (
          <div className="profile-section">
            <div
              className="profile-icon"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src={`https://ui-avatars.com/api/?name=${currentUser.username}&background=random`}
                alt="Profile"
                className="profile-avatar"
              />
            </div>
            {showDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <img
                    src={`https://ui-avatars.com/api/?name=${currentUser.username}&background=random`}
                    alt="Profile"
                    className="dropdown-avatar"
                  />
                  <div className="user-info">
                    <h4>{currentUser.username}</h4>
                    <p>{currentUser.email}</p>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={handleLogout}>
                  <span className="logout-icon">🚪</span>
                  Sign Out
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
