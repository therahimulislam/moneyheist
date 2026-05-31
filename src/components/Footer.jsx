import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-logo">
          {t.logo.part1} <span>{t.logo.part2}</span>
        </div>
        
        <div className="footer-links">
          <a href="https://www.netflix.com/title/80192098" target="_blank" rel="noopener noreferrer" className="clickable">Netflix</a>
          <a href="https://www.instagram.com/lacasadepapel" target="_blank" rel="noopener noreferrer" className="clickable">Instagram</a>
          <a href="https://twitter.com/lacasadepapel" target="_blank" rel="noopener noreferrer" className="clickable">Twitter</a>
        </div>

        <button className="footer-btn clickable">
          {t.footer.join}
        </button>
      </div>

      <div className="footer-bottom">
        <p>{t.footer.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
