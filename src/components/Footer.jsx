import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">CareerCompass</h3>
            <p>
              Your ultimate guide to discovering the perfect career path.
              Explore possibilities, take our assessment, and connect with
              mentors.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/quiz">Career Quiz</Link>
              </li>
              <li>
                <Link to="/recommendations">Recommendations</Link>
              </li>
              <li>
                <Link to="/mentorship">Mentorship</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Resources</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Career Blog</a>
              </li>
              <li>
                <a href="#">Industry Reports</a>
              </li>
              <li>
                <a href="#">Success Stories</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <p>Have questions or suggestions?</p>
            <a href="mailto:info@careercompass.com" className="contact-email">
              info@careercompass.com
            </a>
            <p>123 Career Street, Future City</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} CareerCompass. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
