import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: Trigger the massive scale-up
    const t1 = setTimeout(() => setStage(1), 1000);
    // Stage 2: Fade out the black background container smoothly
    const t2 = setTimeout(() => setStage(2), 2500);
    // Stage 3: Notify App.jsx to unmount
    const t3 = setTimeout(() => onComplete(), 3300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className={`preloader-container ${stage >= 2 ? 'fade-out' : ''}`}>
      <div className={`netflix-intro ${stage >= 1 ? 'zoom-in' : ''}`}>
        
        <div className="netflix-n">
          <div className="n-leg n-left"></div>
          <div className="n-leg n-diagonal"></div>
          <div className="n-leg n-right"></div>
        </div>

        <div className={`spectrum-overlay ${stage >= 1 ? 'show' : ''}`}>
          <div className="ray ray-red"></div>
          <div className="ray ray-cyan"></div>
          <div className="ray ray-magenta"></div>
          <div className="ray ray-yellow"></div>
          <div className="ray ray-blue"></div>
          <div className="ray ray-green"></div>
        </div>

      </div>
    </div>
  );
};

export default Preloader;
