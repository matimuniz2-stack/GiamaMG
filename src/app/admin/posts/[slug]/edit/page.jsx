'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import PostForm from '@/components/PostForm'

export default function EditPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/posts/${slug}`)
      .then(r => r.json())
      .then(data => { setPost(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="admin-page"><p>Cargando...</p></div>
  if (!post) return <div className="admin-page"><p>Post no encontrado</p></div>

  return <PostForm initialData={post} slug={slug} />
}
