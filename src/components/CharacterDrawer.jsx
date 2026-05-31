import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './CharacterDrawer.css';

// Character status metadata
const lore = {
  professor: { status: 'alive' },
  tokyo: { status: 'deceased' },
  berlin: { status: 'deceased' },
  nairobi: { status: 'deceased' },
  rio: { status: 'alive' },
  denver: { status: 'alive' },
  helsinki: { status: 'alive' },
  moscow: { status: 'deceased' },
  oslo: { status: 'deceased' },
  lisbon: { status: 'alive' },
  arturo: { status: 'alive' },
  angel: { status: 'alive' },
  sierra: { status: 'alive' },
  marseille: { status: 'alive' },
  palermo: { status: 'alive' },
  bogota: { status: 'alive' },
  manila: { status: 'alive' },
  stockholm: { status: 'alive' },
};

const CharacterDrawer = ({ character, onClose }) => {
  const { t } = useLanguage();
  const info = lore[character?.id] || {};
  const isDeceased = info.status === 'deceased';

  const charTrans = t.band.characters[character?.id] || {};
  const statusLabel = isDeceased ? t.band.status.deceased : t.band.status.alive;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {character && (
        <>
          {/* Backdrop */}
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            className={`character-drawer ${isDeceased ? 'deceased' : 'alive'}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <button className="drawer-close" onClick={onClose}>✕</button>

            <div className="drawer-image-wrap">
              {character.image && (
                <img src={character.image} alt={charTrans.name || character.name} className="drawer-image" />
              )}
              <div className="drawer-image-overlay" />
            </div>

            <div className="drawer-body">
              <div className={`drawer-status-badge ${isDeceased ? 'badge-deceased' : 'badge-alive'}`}>
                {statusLabel}
              </div>

              <h2 className="drawer-name">{charTrans.name || character.name}</h2>
              <p className="drawer-role">{charTrans.role || character.role}</p>

              {charTrans.quote && (
                <blockquote className="drawer-quote">{charTrans.quote}</blockquote>
              )}

              {charTrans.description && (
                <p className="drawer-desc">{charTrans.description}</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CharacterDrawer;
