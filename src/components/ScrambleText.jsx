import React, { useEffect, useState } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let iteration = 0;
    let interval = null;

    // Reset when text changes
    setDisplayText('');
    
    interval = setInterval(() => {
      setDisplayText((prev) => {
        return text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (char === ' ' || char === '\n') {
              return char;
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('');
      });
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3; // speed of descrambling
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <>{displayText}</>;
};

export default ScrambleText;
