import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ResistanceCard.css';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const drawCard = (canvas, name, idNum, t) => {
  const ctx = canvas.getContext('2d');
  const W = 900, H = 500;
  canvas.width = W;
  canvas.height = H;

  // ── 1. Background ──────────────────────────────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#0c0c0c');
  bg.addColorStop(0.6, '#110000');
  bg.addColorStop(1, '#0a0a0a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // ── 2. Subtle noise texture (random dots) ───────────────────────────────────
  ctx.save();
  ctx.globalAlpha = 0.018;
  for (let i = 0; i < 12000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#fff' : '#E50914';
    ctx.fillRect(
      Math.random() * W,
      Math.random() * H,
      1, 1
    );
  }
  ctx.restore();

  // ── 3. Left red accent column ───────────────────────────────────────────────
  const col = ctx.createLinearGradient(0, 0, 0, H);
  col.addColorStop(0, '#E50914');
  col.addColorStop(1, '#8b0000');
  ctx.fillStyle = col;
  ctx.fillRect(0, 0, 8, H);

  // ── 4. Right panel — dark red wash ─────────────────────────────────────────
  const rightWash = ctx.createLinearGradient(W * 0.62, 0, W, 0);
  rightWash.addColorStop(0, 'rgba(229,9,20,0)');
  rightWash.addColorStop(1, 'rgba(229,9,20,0.06)');
  ctx.fillStyle = rightWash;
  ctx.fillRect(0, 0, W, H);

  // ── 5. Dali mask (concentric ovals, right side) ────────────────────────────
  ctx.save();
  for (let i = 4; i >= 0; i--) {
    const alpha = 0.03 + i * 0.02;
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = '#E50914';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(W - 130, H / 2, 90 + i * 14, 130 + i * 18, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  // Filled mask face
  ctx.globalAlpha = 0.06;
  ctx.fillStyle = '#E50914';
  ctx.beginPath();
  ctx.ellipse(W - 130, H / 2, 75, 110, 0, 0, Math.PI * 2);
  ctx.fill();
  // Eyes
  ctx.globalAlpha = 0.14;
  ctx.fillStyle = '#0c0c0c';
  ctx.beginPath(); ctx.ellipse(W - 155, H / 2 - 22, 12, 7, -0.2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(W - 105, H / 2 - 22, 12, 7, 0.2, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  // ── 6. Fine horizontal rule lines ─────────────────────────────────────────
  ctx.save();
  ctx.globalAlpha = 0.06;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 0.5;
  [120, 200, 310, 390, 450].forEach(y => {
    ctx.beginPath(); ctx.moveTo(36, y); ctx.lineTo(W - 260, y); ctx.stroke();
  });
  ctx.restore();

  // ── 7. Top header strip ────────────────────────────────────────────────────
  ctx.save();
  ctx.globalAlpha = 1;
  // "RESISTANCE NETWORK" label
  ctx.fillStyle = '#E50914';
  ctx.font = 'bold 11px "Courier New"';
  ctx.letterSpacing = '4px';
  ctx.textAlign = 'left';
  ctx.fillText('RESISTANCE NETWORK  ·  CLASSIFIED', 36, 52);

  // Thin red rule under header
  ctx.strokeStyle = '#E50914';
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(36, 62); ctx.lineTo(W - 36, 62); ctx.stroke();
  ctx.restore();

  // ── 8. "CODENAME" label & name ────────────────────────────────────────────
  ctx.fillStyle = 'rgba(255,255,255,0.38)';
  ctx.font = '11px "Courier New"';
  ctx.textAlign = 'left';
  ctx.fillText('OPERATIVE CODENAME', 36, 110);

  // Name — clamp font size to fit
  ctx.fillStyle = '#ffffff';
  const nameFontSize = Math.min(72, Math.max(36, 72 - Math.max(0, name.length - 10) * 4));
  ctx.font = `900 ${nameFontSize}px Arial`;
  ctx.fillText(name.toUpperCase(), 36, 110 + nameFontSize);

  // ── 9. Divider ────────────────────────────────────────────────────────────
  const divGrad = ctx.createLinearGradient(36, 0, 400, 0);
  divGrad.addColorStop(0, '#E50914');
  divGrad.addColorStop(1, 'rgba(229,9,20,0)');
  ctx.fillStyle = divGrad;
  ctx.fillRect(36, 110 + nameFontSize + 16, 280, 2);

  // ── 10. Tagline & mission text ────────────────────────────────────────────
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = '13px "Courier New"';
  ctx.fillText(t.cardTagline.toUpperCase(), 36, 110 + nameFontSize + 46);

  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.font = '11px "Courier New"';
  ctx.fillText('AUTHORIZED · LA FÁBRICA DE MONEDA · OPERATION BELLA CIAO', 36, 110 + nameFontSize + 68);

  // ── 11. ID badge block ────────────────────────────────────────────────────
  const badgeY = H - 130;
  ctx.fillStyle = 'rgba(229,9,20,0.12)';
  ctx.beginPath();
  ctx.roundRect(36, badgeY, 220, 56, 6);
  ctx.fill();
  ctx.strokeStyle = 'rgba(229,9,20,0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(36, badgeY, 220, 56, 6);
  ctx.stroke();

  ctx.fillStyle = '#E50914';
  ctx.font = 'bold 10px "Courier New"';
  ctx.fillText('OPERATIVE ID', 52, badgeY + 20);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px "Courier New"';
  ctx.fillText(`RES-${idNum}-MINT`, 52, badgeY + 42);

  // ── 12. Status badge ──────────────────────────────────────────────────────
  const statusX = 280;
  ctx.fillStyle = 'rgba(0,200,80,0.1)';
  ctx.beginPath();
  ctx.roundRect(statusX, badgeY, 130, 56, 6);
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,200,80,0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(statusX, badgeY, 130, 56, 6);
  ctx.stroke();

  ctx.fillStyle = 'rgba(0,200,80,0.7)';
  ctx.font = 'bold 10px "Courier New"';
  ctx.fillText('STATUS', statusX + 16, badgeY + 20);
  ctx.fillStyle = '#00c850';
  ctx.font = 'bold 14px "Courier New"';
  ctx.fillText('● ACTIVE', statusX + 16, badgeY + 42);

  // ── 13. Barcode (stylized) ────────────────────────────────────────────────
  const bcX = 36, bcY = H - 58;
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  const bars = [3,1,2,1,3,1,1,2,3,1,2,1,1,3,2,1,3,1,2,2,1,3,1,2,1,1,3];
  let bx = bcX;
  bars.forEach((w, i) => {
    if (i % 2 === 0) {
      ctx.fillRect(bx, bcY, w * 2.2, 22);
    }
    bx += w * 2.2 + 1.5;
  });

  // ── 14. Footer rule & branding ────────────────────────────────────────────
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(36, H - 68); ctx.lineTo(W - 36, H - 68); ctx.stroke();
  ctx.restore();

  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = '10px "Courier New"';
  ctx.textAlign = 'left';
  ctx.fillText('LA CASA DE PAPEL  ·  BELLA CIAO  ·  NON È UN RAPINA', 36, H - 16);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#E50914';
  ctx.font = 'bold 10px "Courier New"';
  ctx.fillText('© RESISTANCE', W - 36, H - 16);

  // ── 15. Outer border ─────────────────────────────────────────────────────
  ctx.strokeStyle = 'rgba(229,9,20,0.6)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(1, 1, W - 2, H - 2);

  // Subtle inner inset
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  ctx.strokeRect(12, 12, W - 24, H - 24);
};

const ResistanceCard = () => {
  const { lang } = useLanguage();
  const t = translations[lang].resistanceCard || {
    title: 'JOIN THE RESISTANCE',
    subtitle: 'Generate your encrypted Resistance operative ID.',
    namePlaceholder: 'Enter your codename...',
    generateBtn: 'GENERATE ID',
    downloadBtn: 'Download Card',
    cardTagline: 'Member of the Resistance',
    footerText: 'La Casa de Papel · Bella Ciao',
  };

  const [name, setName] = useState('');
  const [generated, setGenerated] = useState(false);
  const [idNum] = useState(() => `${Math.floor(1000 + Math.random() * 9000)}`);
  const canvasRef = useRef(null);

  const generate = () => {
    if (!name.trim()) return;
    setGenerated(true);
  };

  useEffect(() => {
    if (!generated || !canvasRef.current) return;
    drawCard(canvasRef.current, name.trim(), idNum, t);
  }, [generated, name, idNum, t]);

  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `resistance-${name.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleKey = (e) => { if (e.key === 'Enter') generate(); };

  return (
    <section className="resistance-section" id="resistance">

      {/* Section BG glow */}
      <div className="res-bg-glow" />

      <div className="resistance-container">

        {/* Header */}
        <motion.div
          className="res-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="res-eyebrow">OPERATIVE ENROLLMENT</span>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </motion.div>

        {/* Input row */}
        <motion.div
          className="res-form"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="res-input-wrap">
            <span className="res-input-prefix">›</span>
            <input
              type="text"
              className="res-input"
              placeholder={t.namePlaceholder}
              value={name}
              onChange={(e) => { setName(e.target.value); setGenerated(false); }}
              onKeyDown={handleKey}
              maxLength={18}
            />
            <span className="res-char-count">{name.length}/18</span>
          </div>
          <button className="res-generate-btn" onClick={generate} disabled={!name.trim()}>
            <span className="btn-icon">⬡</span> {t.generateBtn}
          </button>
        </motion.div>

        {/* Card preview */}
        <AnimatePresence>
          {generated && (
            <motion.div
              className="res-preview-wrap"
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="canvas-glow-wrap">
                <canvas ref={canvasRef} className="res-canvas" />
              </div>
              <div className="res-actions">
                <button className="res-download-btn" onClick={download}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  {t.downloadBtn}
                </button>
                <p className="res-hint">Share your card. Join the network.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default ResistanceCard;
