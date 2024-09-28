import React, { useState } from 'react';
import '../css/Survey.css';

const Survey = () => {
  const [emotion, setEmotion] = useState('');
  const [reason, setReason] = useState('');
  const [intensity, setIntensity] = useState('');
  const [duration, setDuration] = useState('');
  const [coping, setCoping] = useState('');
  const [patterns, setPatterns] = useState('');
  const [openToNewStrategies, setOpenToNewStrategies] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [tips, setTips] = useState([]);
  const [media, setMedia] = useState([]);

  const handleEmotionChange = (e) => {
    setEmotion(e.target.value);
  };

  const generateRecommendations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emotion,
          reason,
          intensity,
          duration,
          coping,
          patterns,
          openToNewStrategies,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setTips(data.tips || []);
      setMedia(data.media || []);
      setShowRecommendations(true);  
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateRecommendations();
  };

  return (
    <div>

      {!showRecommendations ? (
        <form onSubmit={handleSubmit} className="survey-form shared-container">
          <h2>How are you feeling today?</h2>
          <select value={emotion} onChange={handleEmotionChange} required>
            <option value="" disabled>Select your emotion</option>
            <option value="happy">Happy</option>
            <option value="neutral">Neutral</option>
            <option value="sad">Sad</option>
            <option value="stressed">Stressed</option>
            <option value="anxious">Anxious</option>
            <option value="angry">Angry</option>
          </select>

          {emotion === 'sad' && (
            <>
              <h3>What do you think is the primary reason for your sadness?</h3>
              <select value={reason} onChange={(e) => setReason(e.target.value)} required>
                <option value="" disabled>Select the reason</option>
                <option value="loss">Loss of a loved one</option>
                <option value="betrayal">Betrayal by someone close</option>
                <option value="loneliness">Feeling lonely</option>
                <option value="work">Work/academic pressure</option>
                <option value="financial">Financial issues</option>
                <option value="health">Health concerns</option>
                <option value="other">Other</option>
              </select>

              <h3>How intense is your sadness on a scale of 1 to 10?</h3>
              <input
                type="number"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(e.target.value)}
                required
              />

              <h3>How long have you been feeling this way?</h3>
              <select value={duration} onChange={(e) => setDuration(e.target.value)} required>
                <option value="" disabled>Select the duration</option>
                <option value="day">Less than a day</option>
                <option value="1-3days">1-3 days</option>
                <option value="4-7days">4-7 days</option>
                <option value="week">More than a week</option>
                <option value="month">More than a month</option>
              </select>
            </>
          )}

          {emotion === 'stressed' && (
            <>
              <h3>What is the main source of your stress?</h3>
              <select value={reason} onChange={(e) => setReason(e.target.value)} required>
                <option value="" disabled>Select the reason</option>
                <option value="work">Work/academic deadlines</option>
                <option value="financial">Financial worries</option>
                <option value="health">Health issues</option>
                <option value="relationship">Relationship problems</option>
                <option value="family">Family concerns</option>
                <option value="future">Uncertainty about the future</option>
                <option value="other">Other</option>
              </select>

              <h3>How do you usually cope with stress?</h3>
              <select value={coping} onChange={(e) => setCoping(e.target.value)} required>
                <option value="" disabled>Select the method</option>
                <option value="exercise">Exercise</option>
                <option value="meditation">Meditation or relaxation techniques</option>
                <option value="talking">Talking to friends or family</option>
                <option value="hobbies">Distracting myself with hobbies</option>
                <option value="other">Other</option>
              </select>
            </>
          )}

          {emotion && (
            <>
              <h3>Have you noticed any patterns in your emotions that you'd like to address?</h3>
              <textarea
                value={patterns}
                onChange={(e) => setPatterns(e.target.value)}
                placeholder="Describe any patterns you've noticed"
              />

              <h3>Would you be open to trying new strategies to improve your emotional well-being?</h3>
              <select value={openToNewStrategies} onChange={(e) => setOpenToNewStrategies(e.target.value)} required>
                <option value="" disabled>Select your response</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="maybe">Maybe</option>
              </select>

              <button type="submit" className="submit-btn">Submit</button>
            </>
          )}
        </form>
      ) : (
        <div className="recommendations shared-container">
          <h3>Follow these recommendations:</h3>
          <ul>
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
            {media.map((rec, index) => (
              <li key={index}>
                {rec.text && <p>{rec.text}</p>}
                {rec.image && <img src={rec.image} alt="Recommendation" className="recommendation-image" />}
                {rec.audio && (
                  <>
                    <p>{rec.text}</p>
                    <audio controls>
                      <source src={rec.audio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Survey;
