import React, { useState, useEffect } from 'react'
import { useLanguage } from './context/LanguageContext'
import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Characters from './components/Characters'
import ThePlan from './components/ThePlan'
import Footer from './components/Footer'
import Particles from './components/Particles'
import Preloader from './components/Preloader'
import AudioToggle from './components/AudioToggle'
import Blueprint from './components/Blueprint'
import Vault from './components/Vault'
import Timeline from './components/Timeline'
import Stats from './components/Stats'
import ResistanceCard from './components/ResistanceCard'

function App() {
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(true);

  // Trigger preloader whenever language changes
  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
  }, [lang]);

  return (
    <>
      {loading && <Preloader key={lang} onComplete={() => setLoading(false)} />}
      <div className={`app-content ${!loading ? 'visible' : 'hidden'}`}>
        <Particles />
        <Navbar />
        <Hero />
        <Stats />
        <Characters />
        <Blueprint />
        <Timeline />
        <ThePlan />
        <Vault />
        <ResistanceCard />
        <Footer />
        <AudioToggle />
      </div>
    </>
  )
}

export default App