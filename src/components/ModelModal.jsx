'use client'

import { useState, useEffect, useRef } from 'react'
import GalleryCarousel from './GalleryCarousel'

const MODELS = {
  mg3: {
    name: 'MG3 Hybrid+',
    subtitle: 'Hatchback | Full Hybrid | 195 CV',
    heroStyle: { background: "url('/img/mg3-lux/KV-1.jpg') center/cover no-repeat" },
    bgGradient: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.3) 100%)',
    defaultImg: '/MG3/Colores/MG-3-RED.webp',
    hideCarOnHero: true,
    warranty: '6 años / 120.000 km + 7 años / 140.000 km batería híbrida',
    warrantySub: 'Garantía líder en el segmento para el vehículo y la batería',
    colors: [
      { color: '#CC2222', src: '/MG3/Colores/MG-3-RED.webp', name: 'Rojo' },
      { color: '#1a1a1a', src: '/MG3/Colores/MG-3-BLACK.webp', name: 'Negro' },
      { color: '#fff', src: '/MG3/Colores/MG-3-WHITE.webp', name: 'Blanco', border: '#ddd' },
      { color: '#2266DD', src: '/MG3/Colores/MG-3-BLUE.webp', name: 'Azul' },
      { color: '#C0C0C0', src: '/MG3/Colores/MG-3-SILVER.webp', name: 'Plata' },
      { color: '#6B6B6B', src: '/MG3/Colores/MG-3-GRAY.webp', name: 'Gris' },
    ],
    specs: [
      { tab: 'Motor', rows: [['Motor','1.5L Hybrid + motor eléctrico'],['Potencia combinada','195 CV'],['Torque combinado','425 Nm'],['Consumo','4.4 L/100 km (hasta 43.5 km/L)'],['Transmisión','Automática e-CVT'],['Tipo','Full Hybrid (no requiere enchufe)']] },
      { tab: 'Dimensiones', rows: [['Largo','4.113 mm'],['Ancho','1.797 mm'],['Alto','1.502 mm'],['Distancia entre ejes','2.570 mm'],['Baúl','293 litros']] },
      { tab: 'Seguridad', rows: [['Airbags','6 airbags'],['Control crucero adaptativo','Sí (ACC)'],['Freno autónomo de emergencia','Sí (AEB)'],['Asistente de carril','Sí (LKA)'],['Control de estabilidad','Sí (ESP)'],['Sensor de punto ciego','Sí (BSM)']] },
      { tab: 'Confort', rows: [['Climatizador','Automático'],['Pantalla central','Táctil multimedia'],['Tapizado (Luxury)','Cuero'],['Luces (Luxury)','Full LED'],['Cámara trasera','Sí']] },
    ],
    versions: {
      headers: ['', 'Comfort', 'Luxury'],
      rows: [['Motor','1.5L Hybrid 195 CV','1.5L Hybrid 195 CV'],['Airbags','6','6'],['ADAS (ACC, AEB, LKA)','Sí','Sí'],['Climatizador','Sí','Sí'],['Tapizado de cuero','No','Sí'],['Luces full LED','No','Sí']],
      prices: ['Precio','USD 23.500*','Consultar'],
    },
    exteriorGallery: [
      { src: '/MG3/Exterior/Right Front 45°.webp', alt: 'MG3 frontal derecho 45°', wide: true },
      { src: '/MG3/Exterior/Left Front 45°.webp', alt: 'MG3 frontal izquierdo 45°' },
      { src: '/MG3/Exterior/High Left Front 45°.webp', alt: 'MG3 frontal izquierdo alto' },
      { src: '/MG3/Exterior/Right Back 45°.webp', alt: 'MG3 trasera derecha' },
      { src: '/MG3/Exterior/Left Back 30°.webp', alt: 'MG3 trasera izquierda' },
      { src: '/MG3/Exterior/The Front.webp', alt: 'MG3 vista frontal' },
      { src: '/MG3/Exterior/Front Side.webp', alt: 'MG3 vista lateral frontal' },
      { src: '/MG3/Exterior/Right Front 30°.webp', alt: 'MG3 frontal derecho 30°' },
      { src: '/MG3/Exterior/Door Panel-2.webp', alt: 'MG3 panel de puerta exterior' },
      { src: '/MG3/Exterior/Trunk-1.webp', alt: 'MG3 baúl abierto' },
      { src: '/MG3/Exterior/Trunk-2.webp', alt: 'MG3 baúl capacidad' },
      { src: '/MG3/Exterior/Trunk-3.webp', alt: 'MG3 baúl abatido' },
    ],
    interiorGallery: [
      { src: '/MG3/Interior/The Dashboard.webp', alt: 'MG3 tablero digital' },
      { src: '/MG3/Interior/Steering Wheel.webp', alt: 'MG3 volante multifunción' },
      { src: '/MG3/Interior/Screen.webp', alt: 'MG3 pantalla multimedia' },
      { src: '/MG3/Interior/Central Control.webp', alt: 'MG3 consola central' },
      { src: '/MG3/Interior/Copilot Deck.webp', alt: 'MG3 panel copiloto' },
      { src: '/MG3/Interior/Front seat.webp', alt: 'MG3 asientos delanteros' },
      { src: '/MG3/Interior/Front Row Space.webp', alt: 'MG3 espacio delantero' },
      { src: '/MG3/Interior/Back Seat.webp', alt: 'MG3 asientos traseros' },
      { src: '/MG3/Interior/Door Panel-1.webp', alt: 'MG3 panel de puerta' },
    ],
    hasFicha: true,
    cotizarText: 'Hola,%20quiero%20cotizar%20el%20MG3%20Hybrid+',
    cotizarLabel: 'Cotizar MG3',
  },
  zs: {
    name: 'MG ZS Hybrid+',
    subtitle: 'SUV Compacto | Hybrid+ | 191 CV',
    heroStyle: { background: "url('/ZS/Portada.jpg') center/cover no-repeat" },
    bgGradient: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.3) 100%)',
    defaultImg: '/ZS/Colores/MG-ZS-HEV-RED.jpg',
    hideCarOnHero: true,
    warranty: '6 años / 120.000 km + 7 años / 140.000 km batería híbrida',
    warrantySub: 'El SUV híbrido más vendido de Europa en 2024',
    colors: [
      { color: '#CC2222', src: '/ZS/Colores/MG-ZS-HEV-RED.jpg', name: 'Rojo' },
      { color: '#1a1a1a', src: '/ZS/Colores/MG-ZS-HEV-BLACK.jpg', name: 'Negro' },
      { color: '#fff', src: '/ZS/Colores/MG-ZS-HEV-WHITE.jpg', name: 'Blanco', border: '#ddd' },
      { color: '#C0C0C0', src: '/ZS/Colores/MG-ZS-HEV-SILVER.jpg', name: 'Plata' },
      { color: '#2266DD', src: '/ZS/Colores/MG-ZS-HEV-BLUE.jpg', name: 'Azul' },
      { color: '#6B6B6B', src: '/ZS/Colores/MG-ZS-HEV-GRAY.jpg', name: 'Gris' },
      { color: '#2E7D32', src: '/ZS/Colores/MG-ZS-HEV-GREEN-MG-4.jpg', name: 'Verde' },
    ],
    specs: [
      { tab: 'Motor', rows: [['Motor','1.5L + 2 motores eléctricos'],['Potencia combinada','191 CV'],['Torque combinado','425 Nm'],['Consumo','4.9 L/100 km'],['Transmisión','CVT automática'],['0-100 km/h','8.7 segundos'],['Velocidad máxima','170 km/h']] },
      { tab: 'Dimensiones', rows: [['Largo','4.430 mm'],['Ancho','1.809 mm'],['Alto','1.653 mm'],['Distancia entre ejes','2.610 mm'],['Baúl','443 litros'],['Tracción','Delantera (FWD)']] },
      { tab: 'Seguridad', rows: [['Airbags','6 airbags'],['Paquete ADAS','Completo'],['Control crucero adaptativo','Sí'],['Freno autónomo','Sí'],['Asistente de carril','Sí'],['Control de estabilidad','Sí']] },
      { tab: 'Confort', rows: [['Pantallas','Pantalla multimedia + panel digital grandes'],['Climatizador','Automático'],['Conectividad','Apple CarPlay / Android Auto']] },
    ],
    versions: {
      headers: ['', 'Comfort', 'Luxury'],
      rows: [['Motor','1.5L Hybrid 191 CV','1.5L Hybrid 191 CV'],['Airbags','6','6'],['ADAS completo','Sí','Sí'],['Pantalla multimedia','Sí','Sí'],['Apple CarPlay / Android Auto','Sí','Sí'],['Techo panorámico','No','Sí'],['Cámara 360°','No','Sí']],
      prices: ['Precio','USD 27.500*','USD 29.900*'],
    },
    exteriorGallery: [
      { src: '/ZS/Exterior/High-left-front-45.jpg', alt: 'MG ZS frontal izquierdo alto', wide: true },
      { src: '/ZS/Exterior/The-front.jpg', alt: 'MG ZS vista frontal' },
      { src: '/ZS/Exterior/Left-front-80.jpg', alt: 'MG ZS frontal izquierdo' },
      { src: '/ZS/Exterior/Left-Rear-45.jpg', alt: 'MG ZS trasera izquierda' },
      { src: '/ZS/Exterior/The-Rear.jpg', alt: 'MG ZS vista trasera' },
      { src: '/ZS/Exterior/The-side.jpg', alt: 'MG ZS vista lateral' },
      { src: '/ZS/Exterior/Low-left-front-15.jpg', alt: 'MG ZS frontal bajo' },
      { src: '/ZS/Exterior/Trunk-1-1.jpg', alt: 'MG ZS baúl abierto' },
      { src: '/ZS/Exterior/Trunk-1-2.jpg', alt: 'MG ZS baúl capacidad' },
      { src: '/ZS/Exterior/Trunk-2-1.jpg', alt: 'MG ZS baúl abatido' },
    ],
    interiorGallery: [
      { src: '/ZS/Interior/Side-large-Interior.jpg', alt: 'MG ZS interior panorámico' },
      { src: '/ZS/Interior/Steering-Wheel.jpg', alt: 'MG ZS volante multifunción' },
      { src: '/ZS/Interior/Instrument-screen.jpg', alt: 'MG ZS panel de instrumentos' },
      { src: '/ZS/Interior/UI.jpg', alt: 'MG ZS pantalla multimedia' },
      { src: '/ZS/Interior/Copilot-Desk.jpg', alt: 'MG ZS panel copiloto' },
      { src: '/ZS/Interior/Electronic-Gear-Level.jpg', alt: 'MG ZS palanca electrónica' },
      { src: '/ZS/Interior/First-Row-Seat.jpg', alt: 'MG ZS asientos delanteros' },
      { src: '/ZS/Interior/Second-Row-seat.jpg', alt: 'MG ZS asientos traseros' },
    ],
    hasFicha: false,
    cotizarText: 'Hola,%20quiero%20cotizar%20el%20MG%20ZS%20Hybrid+',
    cotizarLabel: 'Cotizar ZS',
  },
}

export default function ModelModal({ model, isOpen, onClose, onOpenLightbox }) {
  const data = MODELS[model]
  const [carImg, setCarImg] = useState(data.defaultImg)
  const [activeColor, setActiveColor] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const [imgOpacity, setImgOpacity] = useState(1)
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.scrollTop = 0
    }
    setCarImg(data.defaultImg)
    setActiveColor(0)
    setActiveTab(0)
  }, [isOpen, data.defaultImg])

  const changeColor = (index) => {
    setImgOpacity(0)
    setTimeout(() => {
      setCarImg(data.colors[index].src)
      setActiveColor(index)
      setImgOpacity(1)
    }, 300)
  }

  const getGalleryImages = (gallery) => gallery.map(g => g.src)

  return (
    <div className={`model-modal ${isOpen ? 'open' : ''}`} ref={modalRef}>
      <button className="modal-close" onClick={onClose}>&times;</button>

      <div className="modal-hero" style={data.heroStyle}>
        <div className="modal-bg" style={{ background: data.bgGradient }} />
        <img
          className="modal-car"
          src={carImg}
          alt={`${data.name} — vista principal`}
          style={{ display: data.hideCarOnHero ? 'none' : 'block', opacity: imgOpacity, transition: 'opacity 0.3s' }}
        />
        <div className="modal-info">
          <h1>{data.name}</h1>
          <p>{data.subtitle}</p>
        </div>
      </div>

      <div className="modal-body">
        {/* Warranty */}
        <div className="warranty-banner">
          <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
          <div className="wb-text">
            <h4>{data.warranty}</h4>
            <p>{data.warrantySub}</p>
          </div>
        </div>

        {/* Colors */}
        <h2>Elegí tu color</h2>
        <div className="color-showcase">
          <img
            src={carImg}
            alt={`${data.name} — ${data.colors[activeColor]?.name}`}
            style={{ opacity: imgOpacity, transition: 'opacity 0.3s' }}
          />
        </div>
        <div className="modal-colors">
          <span>Color: <strong>{data.colors[activeColor]?.name}</strong></span>
          {data.colors.map((c, i) => (
            <div
              key={i}
              className={`modal-color-dot ${i === activeColor ? 'active' : ''}`}
              style={{ background: c.color, borderColor: i === activeColor ? 'var(--black)' : (c.border || 'transparent') }}
              onClick={() => changeColor(i)}
              title={c.name}
            />
          ))}
        </div>

        {/* Specs */}
        <h2>Especificaciones técnicas</h2>
        <div className="specs-tabs">
          {data.specs.map((s, i) => (
            <button key={i} className={`spec-tab ${i === activeTab ? 'active' : ''}`} onClick={() => setActiveTab(i)}>
              {s.tab}
            </button>
          ))}
        </div>
        {data.specs.map((s, i) => (
          <div key={i} className={`spec-panel ${i === activeTab ? 'active' : ''}`}>
            <table className="spec-table">
              <tbody>
                {s.rows.map(([label, value], j) => (
                  <tr key={j}><td>{label}</td><td>{value}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* Version comparison */}
        <h2 style={{ marginTop: 40 }}>Comparativa de versiones</h2>
        <table className="version-table">
          <thead>
            <tr>{data.versions.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {data.versions.rows.map((row, i) => (
              <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
            ))}
            <tr className="price-row">{data.versions.prices.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          </tbody>
        </table>

        {/* Gallery */}
        {data.exteriorGallery.length > 0 && (
          <>
            <h2>Galería</h2>
            <GalleryCarousel images={data.exteriorGallery} title="Exterior" />
          </>
        )}

        {data.interiorGallery.length > 0 && (
          <GalleryCarousel images={data.interiorGallery} title="Interior" />
        )}

        {/* Ficha download */}
        {data.hasFicha && (
          <div className="ficha-download">
            <img src="/img/ficha-preview.png" alt="Ficha técnica MG3 Hybrid+ preview" />
            <div className="ficha-download-info">
              <h4>Ficha Técnica MG3 Hybrid+</h4>
              <p>Descargá la ficha técnica completa con todas las especificaciones, dimensiones y equipamiento de cada versión.</p>
              <a href="/img/MG3-Ficha-Tecnica.pdf" download className="btn-download">
                <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                Descargar PDF
              </a>
            </div>
          </div>
        )}

        <p className="price-note">* Precios en USD. Sujetos a modificación sin previo aviso. Consultar condiciones vigentes en el concesionario.</p>

        <div className="modal-ctas">
          <a href={`https://wa.me/5491131347853?text=${data.cotizarText}`} target="_blank" rel="noopener noreferrer" className="btn-primary">
            {data.cotizarLabel}
          </a>
          <a href="#test-drive" className="btn-outline-white" style={{ borderColor: 'var(--black)', color: 'var(--black)' }} onClick={onClose}>
            Agendar Test Drive
          </a>
        </div>
      </div>
    </div>
  )
}
