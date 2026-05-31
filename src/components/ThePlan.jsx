import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './ThePlan.css';

const ThePlan = () => {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const steps = t.plan.steps;

  return (
    <section className="plan-section" id="plan">
      <motion.div 
        className="plan-bg-parallax"
        style={{ y: yBg }}
      />
      
      <div className="plan-content">
        <div className="plan-header">
          <motion.h2 
            className="plan-title"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.plan.title}
          </motion.h2>
          <motion.p 
            className="plan-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t.plan.subtitle}
          </motion.p>
        </div>

        <div className="timeline">
          {steps.map((step, index) => (
            <motion.div 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="timeline-content clickable">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div className="timeline-dot"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThePlan;
