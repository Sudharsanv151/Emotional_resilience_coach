import React from 'react';
import '../css/Recommendations.css'

const Recommendations = ({ recommendations }) => {
  return (
    <div>
      <div>
        
        <ul>
          {recommendations.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
      <div>
    
        {recommendations.memes.map((meme, index) => (
          <img key={index} src={meme} alt={`Meme ${index}`} style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
      <div>
        {recommendations.songs.map((song, index) => (
          <div key={index}>
            <audio controls>
              <source src={song} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;

