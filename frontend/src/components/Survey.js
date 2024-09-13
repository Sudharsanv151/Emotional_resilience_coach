import React, { useState } from 'react';
import './Survey.css';

const Survey = () => {
  const [emotion, setEmotion] = useState('');
  const [reason, setReason] = useState('');
  const [intensity, setIntensity] = useState('');
  const [duration, setDuration] = useState('');
  const [coping, setCoping] = useState('');
  const [patterns, setPatterns] = useState('');
  const [openToNewStrategies, setOpenToNewStrategies] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const handleEmotionChange = (e) => {
    setEmotion(e.target.value);
  };

  const generateRecommendations = () => {
    const recs = [];
    
    if (emotion === 'sad') {
      recs.push("Consider talking to a friend or loved one about your feelings.");
      recs.push("Try engaging in activities that you enjoy to lift your mood.");
      recs.push("Mindfulness exercises or meditation might help manage your sadness.");
    } else if (emotion === 'stressed') {
      recs.push("Take short breaks during work or study sessions to avoid burnout.");
      recs.push("Try practicing deep breathing or relaxation exercises.");
      recs.push("Physical activity like a short walk can help reduce stress.");
    } else if (emotion === 'anxious') {
      recs.push("Consider journaling to explore and understand your anxiety triggers.");
      recs.push("Try grounding exercises or focusing on your breathing to calm yourself.");
      recs.push("If your anxiety is persistent, speaking to a professional might be helpful.");
    }

    if (intensity >= 7) {
      recs.push("Since your emotional intensity is high, consider seeking professional support.");
    }

    setRecommendations(recs);
    setShowRecommendations(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateRecommendations();
    // Handle form submission (e.g., send data to backend)
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="survey-form">
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

      {showRecommendations && (
        <div className="recommendations">
          <h3>Follow this simple steps!</h3>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Survey;
