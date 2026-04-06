'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

export default function GalleryCarousel({ images, title }) {
  const [current, setCurrent] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const trackRef = useRef(null)

  const total = images.length

  const go = useCallback((index) => {
    setCurrent((index + total) % total)
    setTranslateX(0)
  }, [total])

  const next = useCallback(() => go(current + 1), [current, go])
  const prev = useCallback(() => go(current - 1), [current, go])

  const handleDragStart = (e) => {
    setIsDragging(true)
    setStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX)
  }

  const handleDragMove = (e) => {
    if (!isDragging) return
    const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX
    setTranslateX(x - startX)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (translateX > 60) prev()
    else if (translateX < -60) next()
    else setTranslateX(0)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  return (
    <div className="carousel-wrapper">
      {title && <p className="gallery-section-title">{title}</p>}
      <div className="carousel" tabIndex={0} onKeyDown={handleKeyDown} role="region" aria-label={`Galería ${title || ''}`}>
        <div className="carousel-viewport">
        <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Anterior">
          <svg viewBox="0 0 24 24" width="24" height="24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/></svg>
        </button>

        <div
          className="carousel-track-wrapper"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div
            className="carousel-track"
            ref={trackRef}
            style={{
              transform: `translateX(calc(-${current * 100}% + ${isDragging ? translateX : 0}px))`,
              transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {images.map((img, i) => (
              <div className="carousel-slide" key={i}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={900}
                  height={563}
                  sizes="(max-width: 768px) 100vw, 900px"
                  style={{ objectFit: 'cover', width: '100%', height: 'auto', aspectRatio: '16/10' }}
                  draggable={false}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>

        <button className="carousel-btn carousel-next" onClick={next} aria-label="Siguiente">
          <svg viewBox="0 0 24 24" width="24" height="24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor"/></svg>
        </button>
      </div>

      <div className="carousel-counter">
        {current + 1} / {total}
      </div>

      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? 'active' : ''}`}
            onClick={() => go(i)}
            aria-label={`Foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
    </div>
  )
}
