import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import ScrambleText from './ScrambleText'
import MagneticButton from './MagneticButton'
import VideoModal from './VideoModal'
import './Hero.css'

const Hero = () => {
  const heroRef   = useRef(null)
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })
  const smoothRef = useRef({ x: -9999, y: -9999 })
  const trailRef  = useRef([])
  const { t } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])
  const y2 = useTransform(scrollY, [0, 1000], [0, -100])

  useEffect(() => {
    const hero   = heroRef.current
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    const TRAIL_LENGTH = 60
    const HEAD_RADIUS  = 180

    const bottom = new Image()
    const top    = new Image()
    bottom.src = import.meta.env.BASE_URL + 'images/one.png'
    top.src    = import.meta.env.BASE_URL + 'images/twoo.png'

    const resize = () => {
      canvas.width  = hero.offsetWidth
      canvas.height = hero.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    hero.addEventListener('mousemove', onMove)

    let rafId

    const draw = () => {
      const { width, height } = canvas

      const s = smoothRef.current
      const m = mouseRef.current
      s.x += (m.x - s.x) * 0.13
      s.y += (m.y - s.y) * 0.13

      trailRef.current.unshift({ x: s.x, y: s.y })
      if (trailRef.current.length > TRAIL_LENGTH) {
        trailRef.current.length = TRAIL_LENGTH
      }

      const trail = trailRef.current
      ctx.clearRect(0, 0, width, height)

      const drawCover = (context, img) => {
        if (!img.width || !img.height) return;
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;
        let dw = width, dh = height, dx = 0, dy = 0;
        if (imgRatio > canvasRatio) {
          dw = height * imgRatio;
          dx = (width - dw) / 2;
        } else {
          dh = width / imgRatio;
          dy = (height - dh) / 2;
        }
        context.drawImage(img, dx, dy, dw, dh);
      };

      // 1. base image
      drawCover(ctx, bottom)

      // 2. offscreen masked reveal
      const offscreen = document.createElement('canvas')
      offscreen.width  = width
      offscreen.height = height
      const off = offscreen.getContext('2d')

      for (let i = 0; i < trail.length; i++) {
        const t     = 1 - i / trail.length
        const r     = HEAD_RADIUS * (0.25 + 0.75 * t)
        const alpha = Math.pow(t, 1.5)
        off.beginPath()
        off.arc(trail[i].x, trail[i].y, r, 0, Math.PI * 2)
        off.fillStyle = `rgba(0,0,0,${alpha})`
        off.fill()
      }

      off.globalCompositeOperation = 'source-in'
      drawCover(off, top)

      ctx.drawImage(offscreen, 0, 0)

      // 3. cursor head glow — crimson tint for Money Heist
      if (trail.length > 0) {
        const head = trail[0]
        const glow = ctx.createRadialGradient(
          head.x, head.y, 0,
          head.x, head.y, HEAD_RADIUS * 1.4
        )
        glow.addColorStop(0,   'rgba(192, 0, 26, 0.22)')
        glow.addColorStop(0.5, 'rgba(192, 0, 26, 0.11)')
        glow.addColorStop(1,   'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(head.x, head.y, HEAD_RADIUS * 1.4, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
      }
      rafId= requestAnimationFrame(draw)

    }

    let loaded = 0
    const onLoad = () => { if (++loaded === 2) draw() }
    bottom.onload = onLoad
    top.onload    = onLoad

    return () => {
      hero.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  /* ── Framer Motion variants ── */
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  }

  const item = {
    hidden:  { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 12 } },
  }

  return (
    <section className="hero" id="home" ref={heroRef}>
      {/* canvas sits behind everything */}
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* content on top */}
      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT */}
        <motion.div className="left" variants={item} style={{ y: y1 }}>
          <motion.span className="st-eyebrow" variants={item}>
            {t.hero.eyebrowLeft}
          </motion.span>
          <h1 className="st-title" style={{ whiteSpace: 'pre-line' }}>
            <ScrambleText text={t.hero.titleLeft} />
          </h1>
          <p className="hero-desc">{t.hero.descLeft}</p>
          <div className="hero-actions">
            <MagneticButton>
              <button className="hero-btn primary-btn">{t.hero.btnLeft}</button>
            </MagneticButton>
            <MagneticButton>
              <button className="hero-btn secondary-btn" onClick={() => setIsModalOpen(true)}>
                <span className="play-icon">▶</span> {t.hero.btnTrailer}
              </button>
            </MagneticButton>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div className="right" variants={item} style={{ y: y2 }}>
          <motion.span className="st-eyebrow right-eyebrow" variants={item}>
            {t.hero.eyebrowRight}
          </motion.span>
          <h1 className="st-title" style={{ whiteSpace: 'pre-line' }}>
            <ScrambleText text={t.hero.titleRight} />
          </h1>
          <motion.p className="st-text" variants={item}>
            {t.hero.descRight}
          </motion.p>
        </motion.div>
      </motion.div>

      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}

export default Hero