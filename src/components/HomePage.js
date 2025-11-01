// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <section className="hero">
        <img src="https://img.icons8.com/?size=96&id=6DXM8bs2tFSU&format=png" className="hero-img" alt="Luna Mascot" />
        <h1>Meet Luna, <span className="highlight">Your AI Therapist</span></h1>
        <p>Experience compassionate, personalized therapy sessions with Luna, your AI companion who’s here to listen, understand, and support you on your mental wellness journey.</p>
        <div className="hero-buttons">
          <Link to="/chat" className="primary-btn">Start Chatting with Luna</Link>
          <Link to="/mood" className="secondary-btn">Track Your Mood</Link>
        </div>
      </section>

      <section className="features">
        <h2>How Luna 🌙 Helps You</h2>
        <div className="feature-list">
          <div className="feature">
            <div className="icon"></div>
            <h3>Mindful Conversations</h3>
            <p>Chat with Luna anytime, anywhere. She provides empathetic responses.</p>
          </div>
          <div className="feature">
            <div className="icon"></div>
            <h3>Mood Tracking</h3>
            <p>Visualize your emotional journey with beautiful, colorful charts that help you understand patterns and cultivate progress.</p>
          </div>
          <div className="feature">
            <div className="icon"></div>
            <h3>Crisis Support</h3>
            <p>Luna recognizes when you need extra support and provides immediate resources and professional contacts when in need.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Start Your Wellness Journey?</h2>
        <p>Join thousands who trust Luna for their mental health support. Begin your personalized therapy experience today.</p>
        <Link to="/chat" className="primary-btn">Start Free Session</Link>
        <button className="secondary-btn">Learn More</button>
      </section>
    </>
  );
};

export default HomePage;