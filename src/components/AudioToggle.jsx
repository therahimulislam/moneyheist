import React, { useState, useRef } from 'react';
import './AudioToggle.css';

const AudioToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Audio play failed:", error);
      });
    }
  };

  return (
    <div className="audio-toggle-container" onClick={toggleAudio}>
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" 
        loop 
      />
      <div className={`equalizer ${isPlaying ? 'playing' : ''}`}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default AudioToggle;
