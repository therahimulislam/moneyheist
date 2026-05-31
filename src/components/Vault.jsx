import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import './Vault.css';

const Vault = () => {
  const { lang } = useLanguage();
  const t = translations[lang].vault || {
    title: "THE VAULT",
    subtitle: "Enter the 4-digit year it all began.",
    unlocked: "VAULT UNLOCKED",
    secret: "The true heist is not about money. It's about sending a message. Welcome to the resistance.",
    error: "ACCESS DENIED"
  };

  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const CORRECT_PIN = "2017"; // Year the show premiered

  const handleKeyPress = (num) => {
    if (unlocked) return;
    
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);

      if (newPin.length === 4) {
        if (newPin === CORRECT_PIN) {
          setTimeout(() => setUnlocked(true), 500);
        } else {
          setTimeout(() => {
            setError(true);
            setPin('');
          }, 500);
        }
      }
    }
  };

  const handleDelete = () => {
    if (!unlocked && pin.length > 0) {
      setPin(pin.slice(0, -1));
      setError(false);
    }
  };

  return (
    <section className="vault-section" id="vault">
      <div className="vault-container">
        <div className={`vault-door ${unlocked ? 'open' : ''}`}>
          <div className="door-left"></div>
          <div className="door-right"></div>
          
          {!unlocked && (
            <motion.div 
              className="keypad-panel"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>{t.title}</h2>
              <p className="vault-hint">{t.subtitle}</p>
              
              <div className={`pin-display ${error ? 'error-shake' : ''}`}>
                {error ? <span className="error-text">{t.error}</span> : (
                  <>
                    {[...Array(4)].map((_, i) => (
                      <span key={i} className="pin-dot">
                        {pin[i] ? '*' : ''}
                      </span>
                    ))}
                  </>
                )}
              </div>

              <div className="keypad-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button key={num} onClick={() => handleKeyPress(num)} className="keypad-btn">
                    {num}
                  </button>
                ))}
                <button className="keypad-btn action-btn" onClick={handleDelete}>DEL</button>
                <button className="keypad-btn" onClick={() => handleKeyPress(0)}>0</button>
                <button className="keypad-btn action-btn" onClick={() => handleKeyPress('')}>OK</button>
              </div>
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {unlocked && (
            <motion.div 
              className="vault-treasure"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <h2 className="glitch-text" data-text={t.unlocked}>{t.unlocked}</h2>
              <p className="secret-message">{t.secret}</p>
              <div className="treasure-glow"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Vault;
