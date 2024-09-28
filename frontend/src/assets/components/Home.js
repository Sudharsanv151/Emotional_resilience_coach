import React from 'react';

import '../css/Home.css';

function Home() {
  return (
    <section id="home" className="home">
      <div className="home-content">
        <h2>Welcome to Your Emotional Resilience Coach</h2>
        <p>Track your emotions, reduce stress, and get personalized strategies for building resilience.</p>
        <a href="#survey" className="btn primary-btn">Start Survey</a>
      </div>
    </section>
  );
}

export default Home;
