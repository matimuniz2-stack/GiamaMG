'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin/posts')
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleDelete = async (slug, title) => {
    if (!confirm(`¿Eliminar "${title}"?`)) return
    await fetch(`/api/admin/posts/${slug}`, { method: 'DELETE' })
    setPosts(posts.filter(p => p.slug !== slug))
  }

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Blog — Panel de Administración</h1>
          <p>{posts.length} {posts.length === 1 ? 'artículo' : 'artículos'}</p>
        </div>
        <div className="admin-header-actions">
          <Link href="/admin/posts/new" className="admin-btn admin-btn-primary">+ Nuevo artículo</Link>
          <button onClick={handleLogout} className="admin-btn admin-btn-outline">Cerrar sesión</button>
        </div>
      </div>

      {loading ? (
        <p className="admin-empty">Cargando...</p>
      ) : posts.length === 0 ? (
        <div className="admin-empty">
          <p>No hay artículos publicados.</p>
          <Link href="/admin/posts/new" className="admin-btn admin-btn-primary">Crear el primero</Link>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha</th>
              <th>Autor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug}>
                <td>
                  <strong>{post.title}</strong>
                  <br />
                  <small style={{ color: '#999' }}>/blog/{post.slug}</small>
                </td>
                <td>{new Date(post.date).toLocaleDateString('es-AR')}</td>
                <td>{post.author}</td>
                <td>
                  <div className="admin-actions">
                    <Link href={`/blog/${post.slug}`} target="_blank" className="admin-btn-sm">Ver</Link>
                    <Link href={`/admin/posts/${post.slug}/edit`} className="admin-btn-sm">Editar</Link>
                    <button onClick={() => handleDelete(post.slug, post.title)} className="admin-btn-sm admin-btn-danger">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
