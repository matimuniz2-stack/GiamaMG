'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

const slides = [
  { img: '/img/hero/KV-1.jpg', alt: 'MG3 Hybrid+ — vista frontal en Mar del Plata' },
  { img: '/ZS/Portada.webp', alt: 'MG ZS Hybrid+ — SUV híbrido' },
  { img: '/img/hero/KV-2.jpg', alt: 'MG3 Hybrid+ — vista nocturna' },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef(null)

  const goToSlide = useCallback((n) => {
    setCurrent((n + slides.length) % slides.length)
  }, [])

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 7000)
  }, [])

  useEffect(() => {
    resetInterval()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [resetInterval])

  const handleDotClick = (i) => {
    goToSlide(i)
    resetInterval()
  }

  return (
    <section className="hero" id="hero">
      {slides.map((slide, i) => (
        <div key={i} className={`hero-slide ${i === current ? 'active' : ''}`}>
          <div className="slide-bg" style={{ animation: i === current ? 'heroZoom 12s ease-out forwards' : 'none' }}>
            <Image
              src={slide.img}
              alt={slide.alt}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority={i === 0}
            />
          </div>
        </div>
      ))}
      <div className="hero-content">
        <div className="hero-badge">Concesionario Oficial MG</div>
        <h1 className="hero-title">Tradición británica.<br />Tecnología de vanguardia.</h1>
        <p className="hero-sub">Más de 100 años de legado automotriz. Tecnología Full Hybrid que no requiere enchufe. Ahora en Mar del Plata.</p>
        <div className="hero-ctas">
          <a href="#modelos" className="btn-primary">Descubrí los modelos</a>
          <a href="#test-drive" className="btn-outline-white">Agendar Test Drive</a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="hero-scroll-line"></div>
        <span>Scroll</span>
      </div>
      <div className="hero-dots">
        {slides.map((_, i) => (
          <button key={i} className={`hero-dot ${i === current ? 'active' : ''}`} onClick={() => handleDotClick(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  )
}
