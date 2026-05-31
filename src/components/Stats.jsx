import React, { useEffect, useRef, useState } from 'react';
import './Stats.css';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const useCountUp = (target, duration = 2000, started) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return count;
};

const StatCard = ({ value, label, prefix = '', suffix = '', duration = 2000, started }) => {
  const count = useCountUp(value, duration, started);

  const formatted = count.toLocaleString();

  return (
    <div className="stat-card">
      <div className="stat-value">
        {prefix}<span>{formatted}</span>{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const Stats = () => {
  const { lang } = useLanguage();
  const t = translations[lang].stats || {
    title: 'THE NUMBERS',
    subtitle: 'Everything about the Royal Mint heist, by the numbers.',
    money: 'Money Printed',
    hostages: 'Hostages Taken',
    days: 'Days Inside the Mint',
    seasons: 'Seasons of the Show',
  };

  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" id="stats" ref={ref}>
      <div className="stats-header">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </div>
      <div className="stats-grid">
        <StatCard value={2400000000} prefix="€" label={t.money} duration={3000} started={started} />
        <StatCard value={67} label={t.hostages} duration={1500} started={started} />
        <StatCard value={11} label={t.days} duration={1200} started={started} />
        <StatCard value={5} label={t.seasons} duration={1000} started={started} />
      </div>
    </section>
  );
};

export default Stats;
