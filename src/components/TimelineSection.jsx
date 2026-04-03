'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { CONTACT } from '@/data/constants'

const timelineData = [
  { year: '1924', img: '/img/history/Old No 1.jpg', alt: 'Old Number One — el primer MG, 1924', title: 'Old Number One', desc: 'Cecil Kimber crea el primer MG en Oxford. Nace una leyenda del automovilismo deportivo británico que marcaría la historia para siempre.' },
  { year: '1930s', img: '/img/history/Auto MG ANT.jpg', alt: 'MG en competición, años 1930', title: 'Espíritu de competición', desc: 'MG domina las pistas europeas. Sus autos de carrera se convierten en ícono de velocidad, estableciendo récords mundiales y ganando seguidores en todo el mundo.' },
  { year: '1950s', img: '/img/history/AutoCasa.jpg', alt: 'MGA Roadster clásico, años 1950', title: 'MGA — Elegancia atemporal', desc: 'El MGA redefine el roadster. Líneas aerodinámicas y pura elegancia británica lo convierten en uno de los autos más deseados de la época.' },
  { year: '1960s', img: '/img/history/antiguo4.jpg', alt: 'MGB GT, años 1960', title: 'MGB — Un clásico inmortal', desc: 'Con más de 500.000 unidades producidas, el MGB se convierte en el auto deportivo británico más exitoso de la historia. Un verdadero ícono cultural.' },
  { year: '2024', img: '/img/history/cyberster.jpg', alt: 'MG Cyberster, 2024', title: 'Cyberster — El futuro es ahora', desc: 'MG presenta el Cyberster, un roadster 100% eléctrico que rinde homenaje al legado deportivo de la marca con tecnología del siglo XXI.' },
]

const stats = [
  { number: 1924, label: 'Fundación en Oxford', suffix: '' },
  { number: 100, label: 'Años de historia', suffix: '+' },
  { number: 40, label: 'Países', suffix: '+' },
  { number: 6, label: 'Años de garantía', suffix: '' },
]

function AnimatedCounter({ target, suffix, active }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || hasAnimated.current) return
    hasAnimated.current = true

    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [active, target])

  return <>{count}{suffix}</>
}

export default function TimelineSection() {
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const statsRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)
  const [itemProgress, setItemProgress] = useState(timelineData.map(() => 0))

  // Animated timeline line fill on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !lineRef.current) return

      const rect = timelineRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const timelineTop = rect.top
      const timelineHeight = rect.height

      // Calculate how much of the timeline has been scrolled past
      const scrolled = windowHeight - timelineTop
      const totalScrollable = timelineHeight + windowHeight * 0.5
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1)

      lineRef.current.style.height = `${progress * 100}%`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track individual item scroll progress for grayscale/parallax
  useEffect(() => {
    const items = document.querySelectorAll('.tl-item')

    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const newProgress = []

      items.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        // 0 = not visible, 1 = centered in viewport
        const distFromCenter = Math.abs(center - windowHeight / 2)
        const maxDist = windowHeight / 2 + rect.height / 2
        const progress = Math.max(1 - distFromCenter / maxDist, 0)
        newProgress.push(progress)
      })

      setItemProgress(newProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Timeline item reveal
  useEffect(() => {
    const items = document.querySelectorAll('.tl-item')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' })
    items.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Stats counter trigger
  useEffect(() => {
    if (!statsRef.current) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsVisible(true)
    }, { threshold: 0.3 })
    obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="section" id="sobre-mg" style={{ background: 'var(--grey-light)' }}>
      <p className="section-tag reveal">Sobre MG</p>
      <h2 className="section-title reveal">Más de 100 años de historia británica</h2>
      <div className="about-intro reveal">
        <p><strong>MG (Morris Garages)</strong> fue fundada en 1924 en Oxford, Inglaterra. Desde entonces, la marca se convirtió en ícono de autos deportivos y roadsters legendarios, combinando diseño británico con ingeniería de vanguardia.</p>
        <p>Hoy, como parte de <strong>SAIC Motor</strong>, MG mantiene su centro de diseño en Londres y lidera la transición hacia la movilidad híbrida y eléctrica en más de 40 países.</p>
      </div>

      {/* Animated stats */}
      <div className="about-stats reveal" ref={statsRef}>
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat-number">
              <AnimatedCounter target={s.number} suffix={s.suffix} active={statsVisible} />
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <h3 className="timeline-title reveal">Un siglo de pasión automotriz</h3>

      {/* Enhanced timeline */}
      <div className="tl-timeline" ref={timelineRef}>
        {/* Animated fill line */}
        <div className="tl-line-track">
          <div className="tl-line-fill" ref={lineRef} />
        </div>

        {timelineData.map((item, i) => {
          const progress = itemProgress[i] || 0
          const grayscale = 1 - progress
          const scale = 0.92 + progress * 0.08
          const parallaxY = (1 - progress) * 20
          const isLast = i === timelineData.length - 1

          return (
            <div className="tl-item" key={item.year}>
              <div className="tl-img-wrap">
                <div
                  className="tl-img"
                  style={{
                    transform: `scale(${scale})`,
                    filter: isLast ? 'none' : `grayscale(${grayscale})`,
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    loading="lazy"
                    style={{ transform: `translateY(${parallaxY}px)` }}
                  />
                </div>
              </div>
              <div className={`tl-year ${progress > 0.5 ? 'active' : ''}`}>{item.year}</div>
              <div className="tl-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* GIAMA block */}
      <div className="giama-block reveal">
        <div>
          <h3>MG llega a Argentina con GIAMA</h3>
          <p>En 2025, MG desembarca en Argentina a través de <strong>Eximar</strong>, el mismo importador de Volvo, Jaguar, Land Rover y Geely, con una red inicial de 10 concesionarios en todo el país.</p>
          <p><strong>GIAMA</strong>, con más de 40 años de trayectoria en el mercado automotor, es el concesionario oficial de MG en <strong>Mar del Plata</strong>.</p>
          <div className="giama-highlight">
            <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, fill: 'var(--red)', flexShrink: 0 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
            <p>{CONTACT.addressShort}</p>
          </div>
        </div>
        <div className="giama-imgs">
          <img src="/img/hero/KV-2.jpg" alt="MG3 Hybrid+ — vista profesional" loading="lazy" />
          <img src="/img/mg3-interior/Steering Wheel.jpg" alt="MG3 interior — volante" loading="lazy" />
          <img src="/img/mg3-lux/Wheels.jpg" alt="MG3 — llantas de diseño" loading="lazy" />
        </div>
      </div>
    </section>
  )
}
