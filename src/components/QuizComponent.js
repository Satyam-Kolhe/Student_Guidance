import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './QuizComponent.css';

function QuizComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [careerData, setCareerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const calculateCareerMatches = (answers) => {
    const careerTraits = {
      'Engineering': [0.9, 0.2, 0.7, 0.3, 0.5, 0.9, 0.1, 0.8, 0.4, 0.3],
      'Design': [0.3, 0.9, 0.4, 0.2, 0.6, 0.3, 0.8, 0.4, 0.5, 0.7],
      'Data Science': [0.8, 0.3, 0.9, 0.2, 0.6, 0.7, 0.1, 0.8, 0.4, 0.3],
      'Healthcare': [0.4, 0.3, 0.5, 0.9, 0.6, 0.2, 0.3, 0.7, 0.8, 0.4],
      'Management': [0.6, 0.4, 0.5, 0.7, 0.9, 0.4, 0.3, 0.6, 0.7, 0.8],
      'Technology': [0.8, 0.4, 0.7, 0.3, 0.6, 0.9, 0.2, 0.7, 0.4, 0.5],
      'Arts': [0.2, 0.9, 0.3, 0.4, 0.5, 0.2, 0.9, 0.3, 0.6, 0.4],
      'Administration': [0.5, 0.3, 0.6, 0.4, 0.7, 0.3, 0.2, 0.9, 0.5, 0.6],
      'Social Work': [0.3, 0.4, 0.4, 0.9, 0.6, 0.2, 0.5, 0.4, 0.8, 0.5],
      'Sales': [0.5, 0.6, 0.4, 0.5, 0.8, 0.3, 0.4, 0.5, 0.4, 0.9]
    };

    const matches = {};
    
    Object.entries(careerTraits).forEach(([career, weights]) => {
      let totalScore = 0;
      let maxScore = 0;
      
      answers.forEach((answer, index) => {
        if (answer !== null) {
          const normalizedAnswer = (5 - answer) / 4;
          totalScore += normalizedAnswer * weights[index];
          maxScore += weights[index];
        }
      });
      
      matches[career] = (totalScore / maxScore) * 100;
    });

    return matches;
  };

  const questions = [
    "I enjoy solving complex problems and logical puzzles.",
    "I prefer creative activities like drawing, writing, or designing.",
    "I like working with numbers and analyzing data.",
    "I feel satisfied when helping or caring for others.",
    "I enjoy leading teams and making strategic decisions.",
    "I am curious about how machines and technology work.",
    "I love expressing myself through music, dance, or theater.",
    "I prefer structured tasks with clear instructions over open-ended work.",
    "I am passionate about environmental or social causes.",
    "I like selling ideas, products, or negotiating deals."
  ];

  const handleOptionSelect = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = async () => {
    setLoading(true);
    try {
      const careerMatches = calculateCareerMatches(answers);
      const sortedCareers = Object.entries(careerMatches)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

      const resultData = {
        careers: sortedCareers.map(([career]) => career),
        percentages: sortedCareers.map(([, percentage]) => Math.round(percentage))
      };
      
      setCareerData(resultData);
      setShowResults(true);
      localStorage.setItem('quizCompleted', 'true');
      localStorage.setItem('careerResults', JSON.stringify(resultData));
      navigate('/recommendations');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(Array(10).fill(null));
    setShowResults(false);
    setCareerData(null);
  };

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

  if (!showResults) {
    return (
      <div className="quiz-container">
        <div className="progress-indicator">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <h2 className="question-text">{questions[currentQuestion]}</h2>
        
        <div className="rating-container">
          <div className="rating-label top">Strongly Agree</div>
          <div className="rating-buttons">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                className={`rating-button ${answers[currentQuestion] === value ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="rating-label bottom">Strongly Disagree</div>
        </div>
        
        <div className="navigation-buttons">
          <button 
            className="nav-button" 
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          
          {currentQuestion < questions.length - 1 ? (
            <button 
              className="nav-button" 
              onClick={nextQuestion}
              disabled={answers[currentQuestion] === null}
            >
              Next
            </button>
          ) : (
            <button 
              className="submit-button" 
              onClick={submitQuiz}
              disabled={answers[currentQuestion] === null || loading}
            >
              {loading ? 'Analyzing...' : 'Get Results'}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <h2>Your Career Recommendations</h2>
      <p>Based on your unique personality profile.</p>
      
      {careerData && (
        <div className="results-content">
          <div className="career-circles">
            {careerData.careers.map((career, index) => (
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
                      strokeDasharray={`${careerData.percentages[index]} 100`}
                    />
                  </svg>
                  <div className="circle-text">
                    {careerData.percentages[index]}%
                  </div>
                </div>
                <div className="career-label">{career}</div>
              </div>
            ))}
          </div>
          
          <div className="analysis-section">
            <h3>Analysis of Your Results</h3>
            <div className="analysis-content">
              {careerData.careers.map((career, index) => (
                <div key={career} className="career-analysis">
                  <h4>{career} ({careerData.percentages[index]}% match)</h4>
                  <p>
                    Your responses indicate a strong alignment with {career.toLowerCase()} roles. 
                    This suggests you would thrive in environments that require 
                    {careerData.percentages[index] > 70 ? ' high levels of ' : ' '}
                    {getCareerTraits(career)}.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="results-actions">
        <button className="retake-button" onClick={resetQuiz}>
          Retake Quiz
        </button>
        <Link to="/mentors" className="mentors-button">
          View Recommended Mentors
        </Link>
      </div>
    </div>
  );
}

export default QuizComponent; 