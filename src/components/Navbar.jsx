import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import './Navbar.css'

const Navbar = () => {
  const { lang, toggleLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false); // Close mobile menu if open
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo" onClick={() => scrollToSection('home')}>
        {t.logo.part1} <span>{t.logo.part2}</span>
      </div>

      {/* Desktop Menu */}
      <div className="nav-content desktop-only">
        <ul className="nav-links">
          <li onClick={() => scrollToSection('home')}>{t.nav.home}</li>
          <li onClick={() => scrollToSection('band')}>{t.nav.professor}</li>
          <li onClick={() => scrollToSection('band')}>{t.nav.band}</li>
          <li onClick={() => scrollToSection('plan')}>{t.nav.plan}</li>
        </ul>
        
        <div className="nav-actions">
          <button className="lang-toggle" onClick={toggleLanguage}>
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
            <span className="separator">|</span>
            <span className={lang === 'es' ? 'active' : ''}>ES</span>
          </button>
        </div>
      </div>

      {/* Mobile Hamburger */}
      <div className="hamburger mobile-only" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ul className="mobile-links">
              <li onClick={() => scrollToSection('home')}>{t.nav.home}</li>
              <li onClick={() => scrollToSection('band')}>{t.nav.professor}</li>
              <li onClick={() => scrollToSection('band')}>{t.nav.band}</li>
              <li onClick={() => scrollToSection('plan')}>{t.nav.plan}</li>
            </ul>
            <button className="lang-toggle mobile-lang" onClick={toggleLanguage}>
              <span className={lang === 'en' ? 'active' : ''}>EN</span>
              <span className="separator">|</span>
              <span className={lang === 'es' ? 'active' : ''}>ES</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar