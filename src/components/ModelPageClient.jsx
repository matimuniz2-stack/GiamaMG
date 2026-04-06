'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import GalleryCarousel from './GalleryCarousel'
import LeadForm from './LeadForm'
import { MODELS } from '@/data/models'
import { CONTACT, WHATSAPP_LINKS } from '@/data/constants'

export default function ModelPageClient({ model }) {
  const data = MODELS[model]
  const [carImg, setCarImg] = useState(data.defaultImg)
  const [activeColor, setActiveColor] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const [slideState, setSlideState] = useState('center')

  useEffect(() => {
    const srcs = [
      ...data.colors.map((c) => c.src),
      ...data.exteriorGallery.map((g) => g.src),
      ...data.interiorGallery.map((g) => g.src),
    ]
    srcs.forEach((src) => {
      const img = new window.Image()
      img.src = src
    })
  }, [data])

  const changeColor = (index) => {
    if (index === activeColor) return
    setCarImg(data.colors[index].src)
    setActiveColor(index)
  }

  return (
    <div className="model-page">
      {/* Navbar simple */}
      <nav className="navbar">
        <div className="navbar-left">
          <Link href="/" className="navbar-logo">
            <Image src="/logo-mg.png" alt="MG Motor logo" width={48} height={48} priority />
            <span className="navbar-giama">GIAMA</span>
          </Link>
          <div className="nav-links">
            <Link href="/#modelos">Modelos</Link>
            <Link href="/#concesionario">Concesionario</Link>
            <Link href="/#test-drive">Test Drive</Link>
            <Link href="/#contacto">Contacto</Link>
            <Link href="/blog">Blog</Link>
          </div>
        </div>
        <div className="navbar-right">
          <a href={`https://wa.me/${CONTACT.whatsapp}?text=${data.cotizarText}`} target="_blank" rel="noopener noreferrer" className="btn-nav-wa">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.789l4.94-1.567A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.09-.613-5.758-1.665l-.412-.251-2.934.931.881-2.848-.267-.424A9.72 9.72 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
            {data.cotizarLabel}
          </a>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/#modelos">Modelos</Link></li>
          <li aria-current="page">{data.name}</li>
        </ol>
      </nav>

      {/* Hero */}
      <div className="modal-hero" style={data.heroStyle}>
        <div className="modal-bg" style={{ background: data.bgGradient }} />
        <div className="modal-info">
          <h1>{data.name}</h1>
          <p>{data.subtitle}</p>
        </div>
      </div>

      {/* Body */}
      <div className="modal-body" style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>
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
            width={960}
            height={540}
            sizes="(max-width: 768px) 100vw, 960px"
            className={`color-slide color-slide--${slideState}`}
            style={{ width: '100%', height: 'auto' }}
            priority
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

        {/* Versions */}
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

        {/* Ficha */}
        {data.hasFicha && (
          <div className="ficha-download">
            <Image src="/img/ficha-preview.webp" alt="Ficha técnica MG3 Hybrid+ preview" width={200} height={280} />
            <div className="ficha-download-info">
              <h4>Ficha Técnica {data.name}</h4>
              <p>Descargá la ficha técnica completa con todas las especificaciones.</p>
              <a href="/img/MG3-Ficha-Tecnica.pdf" download className="btn-download">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                Descargar PDF
              </a>
            </div>
          </div>
        )}

        <p className="price-note">* Precios en USD. Sujetos a modificación sin previo aviso. Consultar condiciones vigentes en el concesionario.</p>

        {/* Cotización form */}
        <div id="cotizar" style={{ marginTop: 48, paddingTop: 32, borderTop: '2px solid #eee' }}>
          <h2>Solicitar Cotización</h2>
          <p className="form-desc" style={{ marginBottom: 24 }}>Completá el formulario y te enviaremos la mejor propuesta para tu {data.name}.</p>
          <LeadForm tipo="cotizacion" />
        </div>

        <div className="modal-ctas" style={{ marginTop: 32 }}>
          <a href={`https://wa.me/${CONTACT.whatsapp}?text=${data.cotizarText}`} target="_blank" rel="noopener noreferrer" className="btn-primary">
            {data.cotizarLabel}
          </a>
          <Link href="/#test-drive" className="btn-outline-white" style={{ borderColor: 'var(--black)', color: 'var(--black)' }}>
            Agendar Test Drive
          </Link>
        </div>
      </div>

      {/* WhatsApp float */}
      <a href={WHATSAPP_LINKS.general} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Contactar por WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.742 3.052 9.38L1.056 31.2l6.064-1.952A15.9 15.9 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.34 22.608c-.39 1.1-1.932 2.012-3.176 2.278-.852.18-1.962.324-5.702-1.226-4.786-1.982-7.864-6.838-8.104-7.156-.228-.318-1.926-2.566-1.926-4.892s1.22-3.47 1.652-3.944c.432-.474.944-.592 1.258-.592.314 0 .63.002.904.016.29.016.68-.11 1.064.812.39.944 1.328 3.238 1.444 3.472.118.234.196.508.04.812-.158.318-.236.514-.472.79-.234.278-.494.62-.706.832-.234.234-.478.488-.206.96.274.47 1.216 2.006 2.61 3.25 1.792 1.6 3.304 2.096 3.774 2.33.472.234.746.196 1.022-.118.274-.314 1.178-1.374 1.492-1.846.314-.474.63-.39 1.062-.234.432.158 2.742 1.294 3.212 1.528.472.234.786.352.904.548.116.196.116 1.138-.274 2.238z"/></svg>
      </a>
    </div>
  )
}
