// src/components/QuotesPage.js
import React from 'react';

const QuotesPage = () => {
  const newQuote = () => {
    // Placeholder function for fetching a new quote
    console.log('Fetching new quote...');
  };

  return (
    <>
      <section className="inspiration">
        <h2>More Inspiration 💕</h2>
        <div className="quotes-list">
          {/* A few example quotes */}
          <div className="quote">
            <div className="quote-icon">💎</div>
            <blockquote>
              "The only way to do great work is to love what you do."
              <span>– Steve Jobs</span>
            </blockquote>
          </div>
          <div className="quote">
            <div className="quote-icon">🎯</div>
            <blockquote>
              "Believe you can and you're halfway there."
              <span>– Theodore Roosevelt</span>
            </blockquote>
          </div>
        </div>
      </section>
      <section className="daily-quote">
        <h2>Daily Inspiration ✨</h2>
        <div id="dailyQuote" className="daily-quote-box">
          “You are braver than you believe, stronger than you seem, and smarter than you think.”<br />
          <span>— A.A. Milne</span>
        </div>
        <button onClick={newQuote}>New Quote</button>
      </section>
    </>
  );
};

export default QuotesPage;