import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.ADMIN_SECRET || 'giama-admin-secret-key-2026')

async function isAuthenticated(request) {
  const cookie = request.cookies.get('admin_session')
  if (!cookie) return false
  try {
    await jwtVerify(cookie.value, SECRET)
    return true
  } catch {
    return false
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Skip login page and auth API
  if (pathname === '/admin/login' || pathname === '/api/admin/auth') {
    return NextResponse.next()
  }

  // Protect admin pages
  if (pathname.startsWith('/admin')) {
    const authed = await isAuthenticated(request)
    if (!authed) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Protect admin API routes
  if (pathname.startsWith('/api/admin')) {
    const authed = await isAuthenticated(request)
    if (!authed) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
