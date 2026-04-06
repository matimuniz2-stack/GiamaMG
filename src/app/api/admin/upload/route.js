import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'No se envió archivo' }, { status: 400 })
    }

    const blob = await put(`blog/${Date.now()}-${file.name}`, file, {
      access: 'public',
    })

    return NextResponse.json({ url: blob.url })
  } catch {
    return NextResponse.json({ error: 'Error al subir la imagen' }, { status: 500 })
  }
}
