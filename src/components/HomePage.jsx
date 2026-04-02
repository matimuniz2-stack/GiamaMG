'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Navbar from './Navbar'
import HeroSlider from './HeroSlider'
import LeadForm from './LeadForm'

const ModelModal = dynamic(() => import('./ModelModal'), { ssr: false })
const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false })

// SVG icons as components
const ShieldIcon = ({ className, style }) => (
  <svg viewBox="0 0 24 24" className={className} style={style}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
)
const MapIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
)
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
)
const ClockIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
)
const EmailIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
)
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
)
const WhatsAppSvg = () => (
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.789l4.94-1.567A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.09-.613-5.758-1.665l-.412-.251-2.934.931.881-2.848-.267-.424A9.72 9.72 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
)

const FAQ_ITEMS = [
  {
    q: '¿Qué garantía tienen los vehículos MG?',
    a: 'Todos los vehículos MG cuentan con 6 años o 120.000 km de garantía en el vehículo y hasta 7 años o 140.000 km en la batería híbrida. Es la garantía más extensa del segmento en Argentina.',
  },
  {
    q: '¿Los MG Hybrid+ necesitan enchufe?',
    a: 'No. Tanto el MG3 Hybrid+ como el MG ZS Hybrid+ son Full Hybrid, lo que significa que la batería se recarga sola con el motor de combustión y la frenada regenerativa. No necesitás ningún tipo de enchufe o cargador.',
  },
  {
    q: '¿Dónde se encuentra el concesionario GIAMA?',
    a: 'Estamos en Gascón 3265, Mar del Plata, Buenos Aires. Nuestro horario de atención es de lunes a viernes de 9 a 18 hs y sábados de 9 a 13 hs.',
  },
  {
    q: '¿Cómo puedo agendar un test drive?',
    a: 'Podés agendar tu test drive completando el formulario en nuestra web, contactándonos por WhatsApp al +54 9 11 3134 7853 o acercándote directamente al concesionario.',
  },
  {
    q: '¿Qué formas de pago aceptan?',
    a: 'Aceptamos pago de contado y ofrecemos opciones de financiación. Contactanos para conocer las condiciones vigentes y la mejor opción para vos.',
  },
  {
    q: '¿MG tiene servicio de postventa en Argentina?',
    a: 'Sí. GIAMA cuenta con servicio técnico oficial MG con técnicos certificados, equipamiento de última generación, repuestos originales y mantenimiento según estándares de fábrica.',
  },
]

export default function HomePage() {
  const [activeModal, setActiveModal] = useState(null) // null | 'mg3' | 'zs'
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0 })
  const [showBackTop, setShowBackTop] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible') })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])


  // Timeline reveal
  useEffect(() => {
    const items = document.querySelectorAll('.timeline-item')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible') })
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' })
    items.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Back to top visibility
  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close modal on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        if (lightbox.open) {
          setLightbox(prev => ({ ...prev, open: false }))
        } else if (activeModal) {
          setActiveModal(null)
          document.body.style.overflow = ''
        }
      }
      if (e.key === 'ArrowRight' && lightbox.open) {
        setLightbox(prev => ({ ...prev, index: (prev.index + 1) % prev.images.length }))
      }
      if (e.key === 'ArrowLeft' && lightbox.open) {
        setLightbox(prev => ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }))
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [activeModal, lightbox.open])

  const openModal = useCallback((model) => {
    setActiveModal(model)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setActiveModal(null)
    document.body.style.overflow = ''
  }, [])

  const openLightbox = useCallback((imgSrc, galleryImages) => {
    const index = galleryImages.indexOf(imgSrc)
    setLightbox({ open: true, images: galleryImages, index: index >= 0 ? index : 0 })
  }, [])

  return (
    <>
      <Navbar openModal={openModal} />

      <HeroSlider />

      {/* ========== MODELOS ========== */}
      <section className="section" id="modelos">
        <p className="section-tag reveal">Modelos</p>
        <h2 className="section-title reveal">Encontrá tu MG ideal</h2>
        <p className="section-subtitle reveal">Tecnología híbrida de última generación con garantía extendida líder en el segmento.</p>

        <div className="models-grid">
          <div className="model-card reveal" onClick={() => openModal('mg3')}>
            <span className="card-tag hybrid">Full Hybrid</span>
            <div className="card-img"><Image src="/img/mg3-icon.webp" alt="MG3 Hybrid+" width={400} height={250} /></div>
            <h3>MG3 Hybrid+</h3>
            <p className="card-specs">195 CV | 4.4 L/100 km</p>
            <div className="warranty-badge"><ShieldIcon style={{width:14,height:14,fill:'var(--red)'}} /> 6 años de garantía</div>
            <p className="card-price">Desde USD 23.500* <span>Comfort</span></p>
            <button className="btn-ver-modelo">Ver modelo</button>
          </div>

          <div className="model-card reveal" onClick={() => openModal('zs')}>
            <span className="card-tag hybrid">Hybrid+</span>
            <div className="card-img"><Image src="/img/zs-icon.png" alt="MG ZS Hybrid+" width={400} height={250} /></div>
            <h3>MG ZS Hybrid+</h3>
            <p className="card-specs">191 CV | 4.9 L/100 km</p>
            <div className="warranty-badge"><ShieldIcon style={{width:14,height:14,fill:'var(--red)'}} /> 6 años de garantía</div>
            <p className="card-price">Desde USD 27.500* <span>Comfort</span></p>
            <button className="btn-ver-modelo">Ver modelo</button>
          </div>
        </div>
        <p className="price-note" style={{textAlign:'center',marginTop:30}}>* Precios en USD. Sujetos a modificación sin previo aviso. Consultar condiciones vigentes en el concesionario.</p>
      </section>

      {/* ========== SOBRE MG / HISTORIA ========== */}
      <section className="section" id="sobre-mg" style={{background:'var(--grey-light)'}}>
        <p className="section-tag reveal">Sobre MG</p>
        <h2 className="section-title reveal">Más de 100 años de historia británica</h2>
        <div className="about-intro reveal">
          <p><strong>MG (Morris Garages)</strong> fue fundada en 1924 en Oxford, Inglaterra. Desde entonces, la marca se convirtió en ícono de autos deportivos y roadsters legendarios, combinando diseño británico con ingeniería de vanguardia.</p>
          <p>Hoy, como parte de <strong>SAIC Motor</strong>, MG mantiene su centro de diseño en Londres y lidera la transición hacia la movilidad híbrida y eléctrica en más de 40 países.</p>
        </div>

        <div className="about-stats reveal">
          <div className="stat"><div className="stat-number">1924</div><div className="stat-label">Fundación en Oxford</div></div>
          <div className="stat"><div className="stat-number">100+</div><div className="stat-label">Años de historia</div></div>
          <div className="stat"><div className="stat-number">40+</div><div className="stat-label">Países</div></div>
          <div className="stat"><div className="stat-number">6</div><div className="stat-label">Años de garantía</div></div>
        </div>

        <h3 className="timeline-title reveal">Un siglo de pasión automotriz</h3>
        <div className="timeline">
          {[
            { year: '1924', img: '/img/history/Old No 1.jpg', alt: 'Old Number One — el primer MG, 1924', title: 'Old Number One', desc: 'Cecil Kimber crea el primer MG en Oxford. Nace una leyenda del automovilismo deportivo británico que marcaría la historia para siempre.' },
            { year: '1930s', img: '/img/history/Auto MG ANT.jpg', alt: 'MG en competición, años 1930', title: 'Espíritu de competición', desc: 'MG domina las pistas europeas. Sus autos de carrera se convierten en ícono de velocidad, estableciendo récords mundiales y ganando seguidores en todo el mundo.' },
            { year: '1950s', img: '/img/history/AutoCasa.jpg', alt: 'MGA Roadster clásico, años 1950', title: 'MGA — Elegancia atemporal', desc: 'El MGA redefine el roadster. Líneas aerodinámicas y pura elegancia británica lo convierten en uno de los autos más deseados de la época.' },
            { year: '1960s', img: '/img/history/antiguo4.jpg', alt: 'MGB GT, años 1960', title: 'MGB — Un clásico inmortal', desc: 'Con más de 500.000 unidades producidas, el MGB se convierte en el auto deportivo británico más exitoso de la historia. Un verdadero ícono cultural.' },
            { year: '2024', img: '/img/history/cyberster.jpg', alt: 'MG Cyberster, 2024', title: 'Cyberster — El futuro es ahora', desc: 'MG presenta el Cyberster, un roadster 100% eléctrico que rinde homenaje al legado deportivo de la marca con tecnología del siglo XXI.' },
          ].map((item) => (
            <div className="timeline-item" key={item.year}>
              <div className="timeline-img"><Image src={item.img} alt={item.alt} width={600} height={400} loading="lazy" /></div>
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="giama-block reveal">
          <div>
            <h3>MG llega a Argentina con GIAMA</h3>
            <p>En 2025, MG desembarca en Argentina a través de <strong>Eximar</strong>, el mismo importador de Volvo, Jaguar, Land Rover y Geely, con una red inicial de 10 concesionarios en todo el país.</p>
            <p><strong>GIAMA</strong>, con más de 40 años de trayectoria en el mercado automotor, es el concesionario oficial de MG en <strong>Mar del Plata</strong>.</p>
            <div className="giama-highlight">
              <svg viewBox="0 0 24 24" style={{width:24,height:24,fill:'var(--red)',flexShrink:0}}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <p>Gascón 3265, Mar del Plata</p>
            </div>
          </div>
          <div className="giama-imgs">
            <Image src="/img/hero/KV-2.jpg" alt="MG3 Hybrid+ — vista profesional" width={400} height={300} loading="lazy" />
            <Image src="/img/mg3-interior/Steering Wheel.jpg" alt="MG3 interior — volante" width={400} height={300} loading="lazy" />
            <Image src="/img/mg3-lux/Wheels.jpg" alt="MG3 — llantas de diseño" width={400} height={300} loading="lazy" />
          </div>
        </div>
      </section>

      {/* ========== CONCESIONARIO ========== */}
      <section className="section" id="concesionario">
        <p className="section-tag reveal">Concesionario</p>
        <h2 className="section-title reveal">Grupo GIAMA — Concesionario Oficial MG</h2>
        <p className="section-subtitle reveal">Más de 40 años de experiencia en el mercado automotor argentino. Venta, postventa y financiación en Mar del Plata.</p>
        <div className="concesionario-grid">
          <div className="conc-info reveal">
            <div className="conc-detail"><MapIcon /><p><strong>Dirección</strong><br />Gascón 3265, Mar del Plata, Buenos Aires</p></div>
            <div className="conc-detail"><PhoneIcon /><p><strong>Teléfono</strong><br /><a href="tel:+5491131347853">+54 9 11 3134 7853</a></p></div>
            <div className="conc-detail"><ClockIcon /><p><strong>Horarios</strong><br />Lunes a Viernes 9 a 18 hs<br />Sábados 9 a 13 hs</p></div>
            <div className="conc-detail"><EmailIcon /><p><strong>Email</strong><br /><a href="mailto:ventas@mg.com">ventas@mg.com</a></p></div>
            <div className="conc-detail"><GlobeIcon /><p><strong>Zona de cobertura</strong><br />Mar del Plata</p></div>
            <a href="https://wa.me/5491131347853?text=Hola,%20quiero%20información%20sobre%20MG" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{marginTop:20}}>
              Contactar por WhatsApp
            </a>
          </div>
          <div className="conc-map reveal">
            <iframe src="https://maps.google.com/maps?q=Gascón+3265+Mar+del+Plata+Argentina&output=embed" allowFullScreen loading="lazy" title="Mapa ubicación GIAMA MG Gascón 3265 Mar del Plata"></iframe>
          </div>
        </div>
      </section>

      {/* ========== TEST DRIVE ========== */}
      <section className="section form-section" id="test-drive">
        <p className="section-tag reveal">Test Drive</p>
        <h2 className="section-title reveal">Agendá tu prueba de manejo</h2>
        <div className="form-grid">
          <div className="form-visual reveal" style={{background:"url('/img/test-drive-bg.jpg') center/cover no-repeat",padding:0}}>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%)',borderRadius:12}} />
            <div className="form-visual-text" style={{zIndex:1}}>
              <h3>Viví la experiencia MG</h3>
              <p>Agendá tu test drive y conocé la tecnología híbrida y eléctrica de cerca</p>
            </div>
          </div>
          <div className="form-box reveal">
            <h3>Solicitar Test Drive</h3>
            <p className="form-desc">Completá el formulario y nos pondremos en contacto para confirmar tu turno.</p>
            <LeadForm tipo="test-drive" />
          </div>
        </div>
      </section>

      {/* ========== CONTACTO / COTIZACIÓN ========== */}
      <section className="section" id="contacto">
        <p className="section-tag reveal">Contacto</p>
        <h2 className="section-title reveal">Pedí tu cotización</h2>
        <div className="form-grid">
          <div className="form-box reveal">
            <h3>Solicitar Cotización</h3>
            <p className="form-desc">Contanos qué modelo te interesa y te enviaremos la mejor propuesta.</p>
            <LeadForm tipo="cotizacion" />
          </div>
          <div className="form-visual reveal" style={{background:"url('/img/cotizacion-bg.jpg') center/cover no-repeat",padding:0}}>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%)',borderRadius:12}} />
            <div className="form-visual-text" style={{zIndex:1}}>
              <h3>Tu próximo MG te espera</h3>
              <p>Consultá precios, versiones y condiciones de financiación</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== POSTVENTA ========== */}
      <section className="section" id="postventa" style={{background:'var(--grey-light)'}}>
        <p className="section-tag reveal">Postventa</p>
        <h2 className="section-title reveal">Servicio integral para tu MG</h2>
        <p className="section-subtitle reveal">En GIAMA te acompañamos después de la compra con servicio técnico oficial, repuestos originales y la mejor atención.</p>
        <div className="postventa-cards">
          <div className="pv-card reveal">
            <svg viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>
            <h4>Service Oficial</h4>
            <p>Técnicos certificados por MG, equipamiento de última generación y mantenimiento según estándares de fábrica.</p>
          </div>
          <div className="pv-card reveal">
            <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>
            <h4>Repuestos Originales</h4>
            <p>Stock de repuestos originales MG con garantía. Pedidos especiales con tiempos de entrega competitivos.</p>
          </div>
          <div className="pv-card reveal">
            <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
            <h4>Garantía Extendida</h4>
            <p>Hasta 6 años / 120.000 km en el vehículo y hasta 8 años / 160.000 km en baterías. Líder en el segmento.</p>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="section" id="faq">
        <p className="section-tag reveal">Preguntas Frecuentes</p>
        <h2 className="section-title reveal">Todo lo que necesitás saber</h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div className={`faq-item${openFaq === i ? ' open' : ''}`} key={i}>
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{item.q}</span>
                <svg viewBox="0 0 24 24" className="faq-chevron"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo-box">
              <Image src="/logo-mg.png" alt="MG Motor logo" width={48} height={48} />
              <span>GIAMA</span>
            </div>
            <p>Concesionario oficial MG en Mar del Plata. Más de 40 años de trayectoria en el mercado automotor argentino.</p>
            <div className="footer-social">
              <a href="https://www.instagram.com/giamamg" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Modelos</h4>
            <a href="#" onClick={(e) => { e.preventDefault(); openModal('mg3') }}>MG3 Hybrid+</a>
            <a href="#" onClick={(e) => { e.preventDefault(); openModal('zs') }}>MG ZS Hybrid+</a>
          </div>
          <div className="footer-col">
            <h4>GIAMA</h4>
            <a href="#sobre-mg">Sobre MG</a>
            <a href="#test-drive">Test Drive</a>
            <a href="#postventa">Postventa</a>
            <a href="#contacto">Contacto</a>
          </div>
          <div className="footer-col">
            <h4>Contacto</h4>
            <a href="https://maps.google.com/?q=Gascón+3265+Mar+del+Plata" target="_blank" rel="noopener noreferrer">Gascón 3265, Mar del Plata</a>
            <a href="tel:+5491131347853">+54 9 11 3134 7853</a>
            <a href="https://wa.me/5491131347853" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="mailto:ventas@mg.com">ventas@mg.com</a>
          </div>
        </div>
        <p className="footer-legal">Los precios expresados en dólares son referenciales y pueden variar. Consulte con el concesionario para valores actualizados. MG Argentina — Importado por Eximar.</p>
        <div className="footer-bottom">
          <p>&copy; 2026 GIAMA — Concesionario Oficial MG | Mar del Plata</p>
          <p>Desarrollado con pasión en Argentina</p>
        </div>
      </footer>

      {/* ========== MODEL MODALS ========== */}
      <ModelModal model="mg3" isOpen={activeModal === 'mg3'} onClose={closeModal} onOpenLightbox={openLightbox} />
      <ModelModal model="zs" isOpen={activeModal === 'zs'} onClose={closeModal} onOpenLightbox={openLightbox} />

      {/* ========== WHATSAPP FLOAT ========== */}
      <a href="https://wa.me/5491131347853?text=Hola,%20quiero%20información%20sobre%20MG" target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Contactar por WhatsApp">
        <svg viewBox="0 0 32 32"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.742 3.052 9.38L1.056 31.2l6.064-1.952A15.9 15.9 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.34 22.608c-.39 1.1-1.932 2.012-3.176 2.278-.852.18-1.962.324-5.702-1.226-4.786-1.982-7.864-6.838-8.104-7.156-.228-.318-1.926-2.566-1.926-4.892s1.22-3.47 1.652-3.944c.432-.474.944-.592 1.258-.592.314 0 .63.002.904.016.29.016.68-.11 1.064.812.39.944 1.328 3.238 1.444 3.472.118.234.196.508.04.812-.158.318-.236.514-.472.79-.234.278-.494.62-.706.832-.234.234-.478.488-.206.96.274.47 1.216 2.006 2.61 3.25 1.792 1.6 3.304 2.096 3.774 2.33.472.234.746.196 1.022-.118.274-.314 1.178-1.374 1.492-1.846.314-.474.63-.39 1.062-.234.432.158 2.742 1.294 3.212 1.528.472.234.786.352.904.548.116.196.116 1.138-.274 2.238z"/></svg>
      </a>

      {/* ========== LIGHTBOX ========== */}
      <Lightbox lightbox={lightbox} setLightbox={setLightbox} />

      {/* ========== BACK TO TOP ========== */}
      <button
        className={`back-to-top${showBackTop ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver arriba"
      >
        <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
      </button>
    </>
  )
}
