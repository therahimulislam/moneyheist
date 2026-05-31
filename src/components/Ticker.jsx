import React from 'react';
import './Ticker.css';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const Ticker = () => {
  const { lang } = useLanguage();
  const t = translations[lang].ticker || {
    items: [
      '🔴 LIVE — Day 5 of the Heist',
      '🎶 Bella Ciao is playing inside the Mint',
      '👥 Hostages: 67 — Status: Controlled',
      '🚔 Police negotiations: ONGOING',
      '💶 Money Printed: €2,400,000,000',
      '🎭 Masks on. Jumpsuits on. No one gets hurt.',
      '📡 El Profesor is watching from outside',
    ]
  };

  const message = t.items.join('   ·   ');

  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        <span className="ticker-content">{message}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;{message}</span>
      </div>
    </div>
  );
};

export default Ticker;
