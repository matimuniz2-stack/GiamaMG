'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { WHATSAPP_LINKS } from '@/data/constants'

// Un slide con `hs: true` muestra su propio texto (lanzamiento de la HS) en vez del general.
const slides = [
  { img: '/img/hero/KV-1.jpg', alt: 'MG3 Hybrid+ — vista frontal en Mar del Plata' },
  { img: '/HS/Portada.webp', alt: 'Nueva MG HS — próximamente en GIAMA', hs: true, pos: '72% center' },
  { img: '/ZS/Portada.webp', alt: 'MG ZS Hybrid+ — SUV híbrido' },
  { img: '/img/hero/KV-2.jpg', alt: 'MG3 Hybrid+ — vista nocturna' },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  // Los slides 2 y 3 se montan recién cuando el hilo principal está libre, así la
  // imagen LCP (slide 0) no compite por ancho de banda en la carga inicial.
  const [mountRest, setMountRest] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    const cb = () => setMountRest(true)
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(cb, { timeout: 3000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(cb, 1500)
    return () => clearTimeout(id)
  }, [])

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
    setMountRest(true)
    goToSlide(i)
    resetInterval()
  }

  return (
    <section className="hero" id="hero">
      {slides.map((slide, i) => (
        <div key={i} className={`hero-slide ${i === current ? 'active' : ''}`}>
          <div className="slide-bg" style={{ animation: i === current ? 'heroZoom 12s ease-out forwards' : 'none' }}>
            {(i === 0 || mountRest) && (
              <Image
                src={slide.img}
                alt={slide.alt}
                fill
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: slide.pos || 'center' }}
                priority={i === 0}
              />
            )}
          </div>
        </div>
      ))}
      {slides[current].hs ? (
        <div className="hero-content" key="hs">
          <div className="hero-badge hero-badge--soon">Próximamente</div>
          <h2 className="hero-title">Se viene la<br />nueva MG HS.</h2>
          <p className="hero-sub">El SUV familiar de MG llega a GIAMA. Reservá la tuya y enterate primero de versiones, precios y fecha de entrega.</p>
          <div className="hero-ctas">
            <Link href="/modelos/hs" className="btn-hero-white">Conocela</Link>
            <a href={WHATSAPP_LINKS.hs} target="_blank" rel="noopener noreferrer" className="btn-outline-white">Reservá la tuya</a>
          </div>
        </div>
      ) : (
      <div className="hero-content" key="general">
        <div className="hero-badge">Concesionario Oficial MG</div>
        <h1 className="hero-title">Tradición británica.<br />Tecnología de vanguardia.</h1>
        <p className="hero-sub">Más de 100 años de legado automotriz. Versiones Full Hybrid sin enchufe y a nafta. Ahora en Mar del Plata.</p>
        <div className="hero-ctas">
          <a href="#modelos" className="btn-hero-white">Descubrí los modelos</a>
          <a href="#test-drive" className="btn-outline-white">Agendar Test Drive</a>
        </div>
      </div>
      )}
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
