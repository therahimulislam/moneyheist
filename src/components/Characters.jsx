import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import CharacterDrawer from './CharacterDrawer';
import './Characters.css';

const Characters = () => {
  const { t } = useLanguage();
  const [selectedChar, setSelectedChar] = useState(null);

  const charactersMetadata = [
    { id: 'professor', image: 'https://static.tvmaze.com/uploads/images/original_untouched/380/951042.jpg' },
    { id: 'berlin', image: 'https://static.tvmaze.com/uploads/images/original_untouched/380/951051.jpg' },
    { id: 'tokyo', image: 'https://static.tvmaze.com/uploads/images/original_untouched/380/951053.jpg' },
    { id: 'nairobi', image: 'https://static.tvmaze.com/uploads/images/original_untouched/380/951052.jpg' },
    { id: 'rio', image: 'https://static.tvmaze.com/uploads/images/original_untouched/380/951045.jpg' },
    { id: 'denver', image: 'https://static.tvmaze.com/uploads/images/original_untouched/380/951059.jpg' },
    { id: 'helsinki', image: 'https://static.tvmaze.com/uploads/images/original_untouched/380/951047.jpg' },
    { id: 'moscow', image: 'https://static.tvmaze.com/uploads/images/original_untouched/380/951049.jpg' },
    { id: 'oslo', image: 'https://static.wikia.nocookie.net/money-heist/images/f/ff/Oslo_-_part_5_volume_2_poster.jpg' },
    { id: 'lisbon', image: 'https://static.tvmaze.com/uploads/images/original_untouched/380/951044.jpg' },
    { id: 'sierra', image: 'https://static.tvmaze.com/uploads/images/original_untouched/380/951054.jpg' },
    { id: 'marseille', image: 'https://static.tvmaze.com/uploads/images/original_untouched/380/951046.jpg' },
    { id: 'palermo', image: 'https://static.tvmaze.com/uploads/images/original_untouched/380/951058.jpg' },
    { id: 'bogota', image: 'https://static.tvmaze.com/uploads/images/original_untouched/380/951063.jpg' },
    { id: 'manila', image: 'https://static.tvmaze.com/uploads/images/original_untouched/380/951062.jpg' },
    { id: 'stockholm', image: 'https://static.tvmaze.com/uploads/images/original_untouched/380/951043.jpg' }
  ];

  const characters = charactersMetadata.map(char => ({
    ...char,
    name: t.band.characters[char.id]?.name || '',
    role: t.band.characters[char.id]?.role || ''
  }));


  const cardVariants = {
    offscreen: { y: 50, opacity: 0, rotateX: 10 },
    onscreen: {
      y: 0, opacity: 1, rotateX: 0,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 }
    }
  };

  return (
    <section className="characters-section" id="band">
      <div className="char-header">
        <motion.h2
          className="char-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
        >
          {t.band.title}
        </motion.h2>
        <motion.p
          className="char-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {t.band.subtitle}
        </motion.p>
      </div>

      <div className="char-grid">
        {characters.map((char) => (
          <motion.div
            className="char-card clickable"
            key={char.id}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0px 20px 40px rgba(192, 0, 26, 0.4)"
            }}
            onClick={() => setSelectedChar(char)}
            title="Click for character bio"
          >
            <div className="char-image-placeholder">
              {char.image ? (
                <img src={char.image} alt={char.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span>{char.name[0]}</span>
              )}
            </div>
            <div className="char-info">
              <h3>{char.name}</h3>
              <p>{char.role}</p>
            </div>
            <div className="char-overlay"></div>
            <div className="char-bio-hint">View Bio →</div>
          </motion.div>
        ))}
      </div>

      <CharacterDrawer character={selectedChar} onClose={() => setSelectedChar(null)} />
    </section>
  );
};

export default Characters;
