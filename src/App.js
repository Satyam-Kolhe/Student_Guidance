import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth';
import MentorRecommendations from './components/MentorRecommendations';
import Navbar from './components/Navbar';
import Home from './components/Home';
import QuizComponent from './components/QuizComponent';
import Recommendations from './components/Recommendations';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('quizCompleted');
    localStorage.removeItem('careerResults');
  };

  return (
    <Router>
      <div className="app">
        {currentUser && <Navbar currentUser={currentUser} onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={<Auth onLogin={handleLogin} />} />
          <Route path="/home" element={currentUser ? <Home /> : <Navigate to="/" />} />
          <Route path="/quiz" element={currentUser ? <QuizComponent /> : <Navigate to="/" />} />
          <Route path="/recommendations" element={currentUser ? <Recommendations /> : <Navigate to="/" />} />
          <Route path="/mentors" element={currentUser ? <MentorRecommendations /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

function getCareerTraits(career) {
  const traits = {
    'Engineering': 'problem-solving, technical skills, and analytical thinking',
    'Design': 'creativity, visual thinking, and attention to detail',
    'Data Science': 'analytical skills, statistical knowledge, and data interpretation',
    'Healthcare': 'empathy, attention to detail, and strong communication skills',
    'Management': 'leadership, strategic thinking, and decision-making abilities',
    'Technology': 'technical aptitude, problem-solving, and innovation',
    'Arts': 'creativity, self-expression, and artistic skills',
    'Administration': 'organization, attention to detail, and process management',
    'Social Work': 'empathy, communication, and problem-solving skills',
    'Sales': 'persuasion, communication, and relationship-building skills'
  };
  return traits[career] || 'relevant skills and abilities';
}

export default App;