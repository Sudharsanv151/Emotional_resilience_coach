import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Survey from './components/Survey';
import Recommendations from './components/Recommendations';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  const [recommendation, setRecommendation] = useState('');

  const handleSurveySubmit = (mood, stressLevel) => {
    let recommendationText = '';

    switch (mood) {
      case 'happy':
        recommendationText = "You're in a great mood! Keep engaging in activities that bring you joy.";
        break;
      case 'neutral':
        recommendationText = "Take some time to relax and do something you enjoy to boost your mood.";
        break;
      case 'sad':
        recommendationText = "It's okay to feel down. Try talking to someone or engaging in a calming activity.";
        break;
      case 'stressed':
        recommendationText = "Consider practicing mindfulness or taking short breaks to manage your stress.";
        break;
      case 'anxious':
        recommendationText = "Deep breathing exercises and mindfulness can help reduce anxiety.";
        break;
      default:
        recommendationText = "Keep tracking your mood for more personalized insights.";
    }

    setRecommendation(recommendationText);
  };

  return (
    <div>
      <Header />
      <Home />
      <Survey onSubmit={handleSurveySubmit} />
      <Recommendations recommendation={recommendation} />
      <About />
      <Footer />
    </div>
  );
}

export default App;
