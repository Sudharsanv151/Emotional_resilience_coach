import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Survey from './components/Survey';
import Recommendations from './components/Recommendations';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  const [recommendations, setRecommendations] = useState({
    tips: [],
    memes: [],
    songs: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSurveySubmit = async (mood, stressLevel) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/get_recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood, stressLevel }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      setRecommendations(data);
    } catch (err) {
      setError('Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Home />
      <Survey onSubmit={handleSurveySubmit} />
      {loading && <p>Loading recommendations...</p>}
      {error && <p>{error}</p>}
      <Recommendations recommendations={recommendations} />
      <About />
      <Footer />
    </div>
  );
}

export default App;
