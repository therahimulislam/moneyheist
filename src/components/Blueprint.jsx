import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './Blueprint.css';

const Blueprint = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  return (
    <section className="blueprint-section" id="blueprint" ref={ref}>
      <div className="blueprint-header">
        <h2>{t.blueprint ? t.blueprint.title : "THE MINT"}</h2>
        <p>{t.blueprint ? t.blueprint.subtitle : "Every exit covered. Every flaw calculated."}</p>
      </div>

      <div className="blueprint-container">
        <svg className="blueprint-svg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
          </pattern>
          <rect width="800" height="400" fill="url(#grid)" />

          {/* Building Outline */}
          <motion.path 
            d="M 100 300 L 100 100 L 300 100 L 300 50 L 500 50 L 500 100 L 700 100 L 700 300 Z"
            fill="none"
            stroke="#C9A44A"
            strokeWidth="3"
            style={{ pathLength, opacity }}
          />

          {/* Inner walls */}
          <motion.path 
            d="M 200 300 L 200 200 L 300 200 M 500 200 L 600 200 L 600 300 M 350 150 L 450 150 M 400 150 L 400 250"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
            strokeDasharray="5 5"
            style={{ pathLength, opacity }}
          />

          {/* Security Points */}
          <motion.circle cx="150" cy="150" r="10" fill="#C0001A" style={{ opacity }} />
          <motion.circle cx="650" cy="150" r="10" fill="#C0001A" style={{ opacity }} />
          <motion.circle cx="400" cy="200" r="15" fill="#C9A44A" style={{ opacity }} />
          
          {/* Labels */}
          <motion.text x="135" y="145" fill="#fff" fontSize="10" style={{ opacity }}>SECURITY</motion.text>
          <motion.text x="635" y="145" fill="#fff" fontSize="10" style={{ opacity }}>SECURITY</motion.text>
          <motion.text x="385" y="195" fill="#C9A44A" fontSize="12" fontWeight="bold" style={{ opacity }}>VAULT</motion.text>
        </svg>
      </div>
    </section>
  );
};

export default Blueprint;
