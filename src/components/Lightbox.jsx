'use client'

export default function Lightbox({ lightbox, setLightbox }) {
  if (!lightbox.open) return null

  const close = () => setLightbox(prev => ({ ...prev, open: false }))
  const nav = (dir) => setLightbox(prev => ({
    ...prev,
    index: (prev.index + dir + prev.images.length) % prev.images.length,
  }))

  return (
    <div className="lightbox open" onClick={close}>
      <button className="lightbox-close" onClick={close}>&times;</button>
      <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); nav(-1) }}>&larr;</button>
      <img src={lightbox.images[lightbox.index]} alt="Galería MG" onClick={(e) => e.stopPropagation()} />
      <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); nav(1) }}>&rarr;</button>
    </div>
  )
}
