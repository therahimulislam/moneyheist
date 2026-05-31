import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import './Timeline.css';

const Timeline = () => {
  const { lang } = useLanguage();
  const t = translations[lang].timeline || {
    title: "THE HEIST LOG",
    subtitle: "A timeline of the perfect crime.",
    events: [
      { id: 1, title: "Day 1: The Breach", desc: "The band infiltrates the Royal Mint masked as Dali." },
      { id: 2, title: "Day 2: The Hostages", desc: "67 hostages. The police are forced to negotiate." },
      { id: 3, title: "Day 5: The Press", desc: "The printing presses run 24/7. €2.4 Billion in the making." },
      { id: 4, title: "Day 11: The Escape", desc: "The tunnel is complete. The resistance is born." }
    ]
  };

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform vertical scroll to horizontal scroll
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={targetRef} className="timeline-section" id="timeline">
      <div className="timeline-sticky-container">
        
        <div className="timeline-header">
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        <motion.div style={{ x }} className="timeline-scroll-track">
          {t.events.map((event, index) => (
            <div key={event.id} className="timeline-card">
              <div className="timeline-number">0{index + 1}</div>
              <div className="timeline-content">
                <h3>{event.title}</h3>
                <p>{event.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
};

export default Timeline;
