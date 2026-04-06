import { NextResponse } from 'next/server'
import { CONTACT } from '@/data/constants'

function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[\d\s+\-()]{7,20}$/
const MAX_LEN = 500
const ALLOWED_MODELS = ['MG3 Hybrid+', 'MG ZS Hybrid+']
const ALLOWED_TYPES = ['test-drive', 'cotizacion']

// Simple rate limiter (per serverless instance)
const rateMap = new Map()
const RATE_WINDOW = 60_000 // 1 minute
const RATE_LIMIT = 5 // max 5 requests per IP per minute

function isRateLimited(ip) {
  const now = Date.now()
  // Cleanup expired entries
  for (const [key, val] of rateMap) {
    if (now - val.start > RATE_WINDOW) rateMap.delete(key)
  }
  const entry = rateMap.get(ip)
  if (!entry || now - entry.start > RATE_WINDOW) {
    rateMap.set(ip, { start: now, count: 1 })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT
}

export async function POST(request) {
  try {
    // CSRF: validate origin
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_SITE_URL || 'https://giamamg.com',
      'http://localhost:3000',
    ]
    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json({ error: 'Origen no permitido' }, { status: 403 })
    }

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Demasiados intentos. Esperá un momento.' }, { status: 429 })
    }

    const body = await request.json()

    const { nombre, email, telefono, modelo, tipo, version, formaPago, fecha, horario, mensaje, recaptchaToken } = body

    // reCAPTCHA v3 verification
    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken) {
        return NextResponse.json({ error: 'Verificación de seguridad fallida' }, { status: 400 })
      }
      try {
        const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        })
        const recaptchaData = await recaptchaRes.json()
        if (!recaptchaData.success || recaptchaData.score < 0.5) {
          return NextResponse.json({ error: 'Verificación de seguridad fallida' }, { status: 403 })
        }
      } catch (recaptchaErr) {
        console.error('reCAPTCHA verify error:', recaptchaErr)
      }
    }

    // Validate required fields
    if (!nombre || !email || !telefono || !modelo || !tipo) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    // Validate allowed values
    if (!ALLOWED_MODELS.includes(modelo)) {
      return NextResponse.json({ error: 'Modelo inválido' }, { status: 400 })
    }
    if (!ALLOWED_TYPES.includes(tipo)) {
      return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 })
    }

    // Validate formats
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }
    if (!PHONE_RE.test(telefono)) {
      return NextResponse.json({ error: 'Teléfono inválido' }, { status: 400 })
    }
    if (nombre.length > MAX_LEN || email.length > MAX_LEN || (mensaje && mensaje.length > 2000)) {
      return NextResponse.json({ error: 'Datos demasiado largos' }, { status: 400 })
    }

    // Build lead object for CRM
    const lead = {
      nombre,
      email,
      telefono,
      modelo,
      tipo, // 'test-drive' | 'cotizacion'
      version: version || null,
      formaPago: formaPago || null,
      fecha: fecha || null,
      horario: horario || null,
      mensaje: mensaje || null,
      origen: 'web-giama',
      timestamp: new Date().toISOString(),
    }

    // ──────────────────────────────────────────────
    // 1. SEND EMAIL via Resend
    // ──────────────────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      const emailTo = process.env.EMAIL_TO || 'autos.mg.ventas@giama.com.ar'

      const subject = tipo === 'test-drive'
        ? `Nuevo Test Drive - ${escapeHtml(modelo)} - ${escapeHtml(nombre)}`
        : `Nueva Cotización - ${escapeHtml(modelo)} - ${escapeHtml(nombre)}`

      const row = (label, value) => value
        ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">${label}</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(value)}</td></tr>`
        : ''

      const htmlBody = `
        <h2>${tipo === 'test-drive' ? 'Solicitud de Test Drive' : 'Solicitud de Cotización'}</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          ${row('Nombre', nombre)}
          ${row('Email', email)}
          ${row('Teléfono', telefono)}
          ${row('Modelo', modelo)}
          ${row('Versión', version)}
          ${row('Forma de pago', formaPago)}
          ${row('Fecha preferida', fecha)}
          ${row('Horario', horario)}
          ${row('Mensaje', mensaje)}
        </table>
        <br>
        <p style="color:#999;font-size:12px;">Lead generado desde web-giama el ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}</p>
      `

      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || 'GIAMA Web <onboarding@resend.dev>',
            to: [emailTo],
            subject,
            html: htmlBody,
          }),
        })

        if (!res.ok) {
          console.error('Resend error:', await res.text())
        }
      } catch (emailErr) {
        console.error('Error sending email:', emailErr)
      }

      // ──────────────────────────────────────────────
      // 2. CONFIRMATION EMAIL to the lead
      // ──────────────────────────────────────────────
      try {
        const confirmHtml = `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#1B1B1B;padding:24px;text-align:center;">
              <img src="${process.env.NEXT_PUBLIC_SITE_URL || 'https://giamamg.com'}/logo-mg.png" alt="MG Motor" width="48" height="48" style="display:inline-block;" />
              <span style="color:#fff;font-size:20px;font-weight:700;margin-left:12px;vertical-align:middle;">GIAMA</span>
            </div>
            <div style="padding:32px 24px;">
              <h2 style="color:#1B1B1B;margin-bottom:16px;">¡Gracias por tu consulta, ${escapeHtml(nombre)}!</h2>
              <p style="color:#333;line-height:1.6;">
                ${tipo === 'test-drive'
                  ? `Recibimos tu solicitud de <strong>Test Drive</strong> para el <strong>${escapeHtml(modelo)}</strong>. Nos vamos a comunicar con vos a la brevedad para confirmar tu turno.`
                  : `Recibimos tu solicitud de <strong>cotización</strong> para el <strong>${escapeHtml(modelo)}</strong>. Te vamos a enviar la mejor propuesta a la brevedad.`
                }
              </p>
              <p style="color:#333;line-height:1.6;margin-top:16px;">Si tenés alguna consulta, no dudes en escribirnos por WhatsApp:</p>
              <a href="https://wa.me/${CONTACT.whatsapp}" style="display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;font-weight:600;text-decoration:none;margin-top:8px;">Escribinos por WhatsApp</a>
            </div>
            <div style="background:#f5f5f5;padding:16px 24px;font-size:12px;color:#999;text-align:center;">
              GIAMA — Concesionario Oficial MG<br>${CONTACT.addressShort}
            </div>
          </div>
        `

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || 'GIAMA Web <noreply@giamamg.com>',
            to: [email],
            subject: tipo === 'test-drive'
              ? `Confirmación de Test Drive — ${escapeHtml(modelo)} | GIAMA`
              : `Confirmación de Cotización — ${escapeHtml(modelo)} | GIAMA`,
            html: confirmHtml,
          }),
        })
      } catch (confirmErr) {
        console.error('Error sending confirmation email:', confirmErr)
      }
    }

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('API /lead error:', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
