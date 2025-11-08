import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import MoodTrackerPage from './components/MoodTrackerPage';
import QuotesPage from './components/QuotesPage';

// --- Import the Login and Registration pages we created ---
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';

import './App.css'; // Your main stylesheet

function App() {
  return (
    <Router>
      <div className="App">
        {/* ======================= NAVIGATION BAR ======================= */}
        <nav>
          <div className="logo">😊 Hela </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/mood">Mood</Link>
            <Link to="/quotes">Quotes</Link>

            {/*
              VVVVVVVVVVVVVVVVVVVVV THIS IS THE LINE WE ARE CHANGING VVVVVVVVVVVVVVVVVVVVV
              We are replacing the <button> element with a <Link> component.
              - `to="/register"` tells the link where to navigate.
              - `className="get-started"` makes sure it still looks exactly like the purple button.
            */}
            <Link to="/register" className="get-started">Get Started</Link>
            {/*
              AAAAAAAAAAAAAAAAAAAAA END OF THE CHANGE AAAAAAAAAAAAAAAAAAAAA
            */}
          </div>
        </nav>

        {/* ======================= MAIN CONTENT & ROUTING ======================= */}
        {/* This is where the different pages are rendered based on the URL */}
        <main>
          <Routes>
            {/* Standard Page Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/mood" element={<MoodTrackerPage />} />
            <Route path="/quotes" element={<QuotesPage />} />

            {/* --- Add the Routes for our new pages --- */}
            {/* When the URL is '/register', show the RegistrationPage component */}
            <Route path="/register" element={<RegistrationPage />} />
            
            {/* When the URL is '/login', show the LoginPage component */}
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;