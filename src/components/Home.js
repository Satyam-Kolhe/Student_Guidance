import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  // Add this effect to enable the scroll reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".features, .testimonials, .cta-section")
      .forEach((section) => {
        observer.observe(section);
      });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <h1>Find Your Perfect Career Path</h1>
        <p className="subtitle">
          Discover careers aligned with your personality, skills, and
          aspirations. Start your journey to a fulfilling professional life
          today.
        </p>
        <div className="cta-buttons">
          <Link to="/quiz" className="cta-button primary">
            Take the Career Quiz
          </Link>
          <Link to="/mentors" className="cta-button secondary">
            Find a Mentor
          </Link>
        </div>
      </section>

      <section className="features">
        <h2>How We Help You Succeed</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Career Quiz</h3>
            <p>Discover careers that match your personality and interests.</p>
            <Link to="/quiz" className="feature-link">
              Explore Career Quiz →
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Recommendations</h3>
            <p>
              Get personalized career recommendations based on your unique
              profile.
            </p>
            <Link to="/recommendations" className="feature-link">
              Explore Recommendations →
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Mentorship</h3>
            <p>Connect with professionals who can guide your career journey.</p>
            <Link to="/mentors" className="feature-link">
              Explore Mentorship →
            </Link>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>Success Stories</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>
              "Taking the career quiz gave me clarity and confidence. It led me
              to pursue Data Science, and now I’m interning at a top tech firm!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">RS</div>
              <div className="author-info">
                <h4>Riya Sharma</h4>
                <p>Data Science Intern</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p>
              "The mentorship sessions were incredibly insightful. My mentor
              helped me crack my first interview at a product-based company."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">AK</div>
              <div className="author-info">
                <h4>Arjun Kumar</h4>
                <p>Frontend Developer</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p>
              "Thanks to this platform, I explored Cloud Computing and now I’m
              pursuing my specialization with full clarity about my future
              goals."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">NS</div>
              <div className="author-info">
                <h4>Nikita Singh</h4>
                <p>Engineering Student</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p>
              "The community and quiz made me realize my passion lies in UI/UX.
              I’ve now designed for 3 startups and continue to grow every day."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">VH</div>
              <div className="author-info">
                <h4>Vedant Hegde</h4>
                <p>UI/UX Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Discover Your Ideal Career?</h2>
        <p>
          Take our comprehensive personality quiz and unlock personalized career
          recommendations that align with who you are.
        </p>
        <Link to="/quiz" className="cta-button primary">
          Start Your Journey Now
        </Link>
      </section>
    </div>
  );
}

export default Home;
