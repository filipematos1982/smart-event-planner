import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Certifique-se de que este arquivo foi criado.

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1>Smart Event Planner</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/create-event">Create Event</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
