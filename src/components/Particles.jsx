import React, { useEffect, useRef } from 'react';
import './Particles.css';

const Particles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * -2 - 0.5; // moving up like embers
        this.opacity = Math.random() * 0.8 + 0.1;
        this.fade = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fade;

        // Add some turbulence
        this.x += Math.sin(this.y * 0.01) * 0.5;

        if (this.opacity <= 0 || this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
          this.opacity = Math.random() * 0.8 + 0.1;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `rgba(255, 200, 50, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(192, 0, 26, ${this.opacity * 0.8})`);
        gradient.addColorStop(1, 'rgba(192, 0, 26, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const numParticles = Math.min(window.innerWidth / 15, 100);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };
    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" />;
};

export default Particles;
