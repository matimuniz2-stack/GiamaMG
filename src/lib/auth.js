import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(process.env.ADMIN_SECRET || 'giama-admin-secret-key-2026')
const COOKIE_NAME = 'admin_session'

export async function createSession() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET)

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

export async function verifySession() {
  const cookie = cookies().get(COOKIE_NAME)
  if (!cookie) return false
  try {
    await jwtVerify(cookie.value, SECRET)
    return true
  } catch {
    return false
  }
}

export async function destroySession() {
  cookies().delete(COOKIE_NAME)
}
