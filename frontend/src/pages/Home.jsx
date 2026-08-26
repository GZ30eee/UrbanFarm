import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="home-page">
      <div className="hero">
        <h1>🌱 Urban Farming Assistant</h1>
        <p>Your AI-powered companion for city gardening</p>
        {user ? (
          <Link to="/app" className="btn-primary">Go to Dashboard</Link>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-secondary">Register</Link>
          </div>
        )}
      </div>
      <div className="features">
        <div className="feature">🌿 Plant Management</div>
        <div className="feature">🔬 Disease Diagnosis</div>
        <div className="feature">🌾 AI Crop Suggestions</div>
        <div className="feature">💧 Smart Watering</div>
      </div>
    </div>
  );
};

export default Home;