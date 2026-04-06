'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PostForm({ initialData, slug }) {
  const isEdit = !!slug
  const router = useRouter()

  const [form, setForm] = useState({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content ? initialData.content.join('\n\n') : '',
    image: initialData?.image || '',
    author: initialData?.author || 'GIAMA',
    date: initialData?.date ? initialData.date.split('T')[0] : new Date().toISOString().split('T')[0],
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) {
        setForm({ ...form, image: data.url })
      } else {
        setError('Error al subir la imagen')
      }
    } catch {
      setError('Error al subir la imagen')
    }
    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const url = isEdit ? `/api/admin/posts/${slug}` : '/api/admin/posts'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        content: form.content.split('\n\n').filter(Boolean),
      }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      const data = await res.json()
      setError(data.error || 'Error al guardar')
    }
    setSaving(false)
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>{isEdit ? 'Editar artículo' : 'Nuevo artículo'}</h1>
        <button onClick={() => router.push('/admin')} className="admin-btn admin-btn-outline">Volver</button>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-group">
          <label>Título</label>
          <input name="title" value={form.title} onChange={handleChange} required placeholder="Título del artículo" />
        </div>

        <div className="admin-form-group">
          <label>Extracto (resumen corto)</label>
          <input name="excerpt" value={form.excerpt} onChange={handleChange} required placeholder="Breve descripción para la vista previa" />
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Autor</label>
            <input name="author" value={form.author} onChange={handleChange} required />
          </div>
          <div className="admin-form-group">
            <label>Fecha</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} required />
          </div>
        </div>

        <div className="admin-form-group">
          <label>Imagen de portada</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <small>Subiendo imagen...</small>}
          {form.image && (
            <div className="admin-image-preview">
              <img src={form.image} alt="Preview" />
            </div>
          )}
        </div>

        <div className="admin-form-group">
          <label>Contenido (separar párrafos con una línea en blanco)</label>
          <textarea name="content" value={form.content} onChange={handleChange} required rows={15} placeholder="Primer párrafo del artículo...&#10;&#10;Segundo párrafo del artículo...&#10;&#10;Tercer párrafo..." />
        </div>

        {error && <span className="admin-error">{error}</span>}

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving || uploading}>
            {saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Publicar artículo'}
          </button>
        </div>
      </form>
    </div>
  )
}
