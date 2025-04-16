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
              "This platform helped me discover my true calling in UX design.
              The personality quiz was spot-on with its recommendations!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">JD</div>
              <div className="author-info">
                <h4>Jamie Davis</h4>
                <p>UX Designer</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p>
              "The mentorship forum connected me with an industry veteran who
              guided me through my career transition. I couldn't be more
              grateful."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">MT</div>
              <div className="author-info">
                <h4>Morgan Taylor</h4>
                <p>Software Engineer</p>
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
