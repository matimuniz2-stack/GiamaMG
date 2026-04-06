import { NextResponse } from 'next/server'
import { getAllPosts, createPost } from '@/lib/db'

export async function GET() {
  const posts = await getAllPosts()
  return NextResponse.json(posts)
}

export async function POST(request) {
  try {
    const data = await request.json()
    const { title, excerpt, content, image, author, date } = data

    if (!title || !excerpt || !content || !image || !date) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const slug = title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const post = await createPost({
      slug,
      title,
      excerpt,
      content: Array.isArray(content) ? content : content.split('\n\n').filter(Boolean),
      image,
      author: author || 'GIAMA',
      date,
    })

    return NextResponse.json(post, { status: 201 })
  } catch (err) {
    if (err.message?.includes('duplicate')) {
      return NextResponse.json({ error: 'Ya existe un post con ese título' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Error al crear el post' }, { status: 500 })
  }
}
