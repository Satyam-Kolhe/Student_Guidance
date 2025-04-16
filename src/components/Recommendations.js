import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Recommendations.css';

function Recommendations() {
  const navigate = useNavigate();
  const careerResults = JSON.parse(localStorage.getItem('careerResults'));
  const quizCompleted = localStorage.getItem('quizCompleted');

  if (!quizCompleted || !careerResults) {
    return (
      <div className="recommendations-container">
        <div className="quiz-required-message">
          <h2>Complete the Career Quiz First</h2>
          <p>To get personalized career recommendations, please complete our career assessment quiz.</p>
          <button 
            className="take-quiz-button"
            onClick={() => navigate('/quiz')}
          >
            Take Career Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <h2>Your Career Recommendations</h2>
      <p className="subtitle">Based on your quiz results</p>
      
      <div className="career-circles">
        {careerResults.careers.map((career, index) => (
          <div key={career} className="career-circle-container">
            <div className="circle-progress">
              <svg viewBox="0 0 100 100">
                <circle
                  className="circle-bg"
                  cx="50"
                  cy="50"
                  r="45"
                />
                <circle
                  className="circle-fill"
                  cx="50"
                  cy="50"
                  r="45"
                  strokeDasharray={`${careerResults.percentages[index]} 100`}
                />
              </svg>
              <div className="circle-text">
                {careerResults.percentages[index]}%
              </div>
            </div>
            <div className="career-label">{career}</div>
          </div>
        ))}
      </div>

      <div className="analysis-section">
        <h3>Analysis of Your Results</h3>
        <div className="analysis-content">
          {careerResults.careers.map((career, index) => (
            <div key={career} className="career-analysis">
              <h4>{career} ({careerResults.percentages[index]}% match)</h4>
              <p>
                Your responses indicate a strong alignment with {career.toLowerCase()} roles. 
                This suggests you would thrive in environments that require 
                {careerResults.percentages[index] > 70 ? ' high levels of ' : ' '}
                {getCareerTraits(career)}.
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations-actions">
        <Link to="/mentors" className="mentors-button">
          View Recommended Mentors
        </Link>
      </div>
    </div>
  );
}

const getCareerTraits = (career) => {
  const traits = {
    'Engineering': 'analytical thinking, problem-solving, and technical skills',
    'Design': 'creativity, visual thinking, and attention to detail',
    'Data Science': 'analytical skills, statistical knowledge, and programming',
    'Healthcare': 'empathy, attention to detail, and scientific knowledge',
    'Management': 'leadership, communication, and strategic thinking',
    'Technology': 'technical skills, problem-solving, and innovation',
    'Arts': 'creativity, expression, and artistic skills',
    'Administration': 'organization, attention to detail, and communication',
    'Social Work': 'empathy, communication, and problem-solving',
    'Sales': 'communication, persuasion, and relationship building'
  };
  return traits[career] || 'relevant skills and knowledge';
};

export default Recommendations; 