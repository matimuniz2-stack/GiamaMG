import { NextResponse } from 'next/server'

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

// Simple rate limiter (per serverless instance)
const rateMap = new Map()
const RATE_WINDOW = 60_000 // 1 minute
const RATE_LIMIT = 5 // max 5 requests per IP per minute

function isRateLimited(ip) {
  const now = Date.now()
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
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Demasiados intentos. Esperá un momento.' }, { status: 429 })
    }

    const body = await request.json()

    const { nombre, email, telefono, modelo, tipo, version, formaPago, fecha, horario, mensaje } = body

    // Validate required fields
    if (!nombre || !email || !telefono || !modelo || !tipo) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
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
      const emailTo = process.env.EMAIL_TO || 'ventas@mg.com'

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
    }

    // ──────────────────────────────────────────────
    // 2. CRM INTEGRATION (ready to plug in)
    // ──────────────────────────────────────────────
    // When you choose a CRM, add the API call here:
    //
    // if (process.env.CRM_API_KEY) {
    //   await fetch('https://api.hubspot.com/crm/v3/objects/contacts', {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${process.env.CRM_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       properties: {
    //         firstname: lead.nombre,
    //         email: lead.email,
    //         phone: lead.telefono,
    //         hs_lead_status: 'NEW',
    //         lead_source: lead.origen,
    //         // custom properties...
    //       }
    //     }),
    //   })
    // }

    return NextResponse.json({ ok: true, lead })

  } catch (err) {
    console.error('API /lead error:', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
