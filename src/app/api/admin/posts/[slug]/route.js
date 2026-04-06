import { NextResponse } from 'next/server'
import { getPostBySlug, updatePost, deletePost } from '@/lib/db'

export async function GET(request, { params }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json()
    const { title, excerpt, content, image, author, date } = data

    if (!title || !excerpt || !content || !image || !date) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const post = await updatePost(params.slug, {
      title,
      excerpt,
      content: Array.isArray(content) ? content : content.split('\n\n').filter(Boolean),
      image,
      author: author || 'GIAMA',
      date,
    })

    if (!post) return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 })
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  await deletePost(params.slug)
  return NextResponse.json({ ok: true })
}
