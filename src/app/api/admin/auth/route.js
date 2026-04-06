import { NextResponse } from 'next/server'
import { createSession, destroySession } from '@/lib/auth'

export async function POST(request) {
  try {
    const { password } = await request.json()
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
    }
    await createSession()
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

export async function DELETE() {
  await destroySession()
  return NextResponse.json({ ok: true })
}
