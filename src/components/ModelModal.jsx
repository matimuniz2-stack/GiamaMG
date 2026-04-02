'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import GalleryCarousel from './GalleryCarousel'
import { MODELS } from '@/data/models'

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

  return (
    <div className={`model-modal ${isOpen ? 'open' : ''}`} ref={modalRef}>
      <button className="modal-close" onClick={onClose} aria-label="Cerrar">&times;</button>

      <div className="modal-hero" style={data.heroStyle}>
        <div className="modal-bg" style={{ background: data.bgGradient }} />
        {!data.hideCarOnHero && (
          <Image
            className="modal-car"
            src={carImg}
            alt={`${data.name} — vista principal`}
            width={600}
            height={400}
            style={{ opacity: imgOpacity, transition: 'opacity 0.3s' }}
          />
        )}
        <div className="modal-info">
          <h1>{data.name}</h1>
          <p>{data.subtitle}</p>
        </div>
      </div>

      <div className="modal-body">
        {/* Warranty */}
        <div className="warranty-banner">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
          <div className="wb-text">
            <h4>{data.warranty}</h4>
            <p>{data.warrantySub}</p>
          </div>
        </div>

        {/* Colors */}
        <h2>Elegí tu color</h2>
        <div className="color-showcase">
          <Image
            src={carImg}
            alt={`${data.name} — ${data.colors[activeColor]?.name}`}
            width={600}
            height={400}
            sizes="(max-width: 768px) 100vw, 600px"
            style={{ opacity: imgOpacity, transition: 'opacity 0.3s', maxWidth: '80%', height: 'auto' }}
          />
        </div>
        <div className="modal-colors">
          <span>Color: <strong>{data.colors[activeColor]?.name}</strong></span>
          {data.colors.map((c, i) => (
            <button
              key={i}
              className={`modal-color-dot ${i === activeColor ? 'active' : ''}`}
              style={{ background: c.color, borderColor: i === activeColor ? 'var(--black)' : (c.border || 'transparent') }}
              onClick={() => changeColor(i)}
              aria-label={`Color ${c.name}`}
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
            <Image src="/img/ficha-preview.webp" alt="Ficha técnica MG3 Hybrid+ preview" width={200} height={280} />
            <div className="ficha-download-info">
              <h4>Ficha Técnica MG3 Hybrid+</h4>
              <p>Descargá la ficha técnica completa con todas las especificaciones, dimensiones y equipamiento de cada versión.</p>
              <a href="/img/MG3-Ficha-Tecnica.pdf" download className="btn-download">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
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
