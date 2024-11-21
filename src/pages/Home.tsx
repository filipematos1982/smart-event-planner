import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Smart Event Planner</h1>
        <p>Your one-stop solution for organizing events efficiently.</p>
        <p>"The Smart Event Planner is an intuitive application to create, manage, and view events. Get started now!"</p>
      </header>

      <div className="cta-buttons">
        <button onClick={() => navigate('/dashboard')} className="cta-button">
          View Dashboard
        </button>
        <button onClick={() => navigate('/create')} className="cta-button">
          Create Event
        </button>
      </div>

      <footer className="home-footer">
        <p>© 2024 Smart Event Planner. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
