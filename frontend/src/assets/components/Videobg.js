// src/assets/components/VideoBackground.js
import React from 'react';
import '../css/Videobg.css'; // Import CSS for styling
import videoFile from '../video/videobg.mp4'; // Import the video file

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
