import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    const { nombre, email, telefono, modelo, tipo, version, formaPago, fecha, horario, mensaje } = body

    // Validate required fields
    if (!nombre || !email || !telefono || !modelo || !tipo) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
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
        ? `Nuevo Test Drive - ${modelo} - ${nombre}`
        : `Nueva Cotización - ${modelo} - ${nombre}`

      const htmlBody = `
        <h2>${tipo === 'test-drive' ? 'Solicitud de Test Drive' : 'Solicitud de Cotización'}</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Nombre</td><td style="padding:8px;border-bottom:1px solid #eee;">${nombre}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Teléfono</td><td style="padding:8px;border-bottom:1px solid #eee;">${telefono}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Modelo</td><td style="padding:8px;border-bottom:1px solid #eee;">${modelo}</td></tr>
          ${version ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Versión</td><td style="padding:8px;border-bottom:1px solid #eee;">${version}</td></tr>` : ''}
          ${formaPago ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Forma de pago</td><td style="padding:8px;border-bottom:1px solid #eee;">${formaPago}</td></tr>` : ''}
          ${fecha ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Fecha preferida</td><td style="padding:8px;border-bottom:1px solid #eee;">${fecha}</td></tr>` : ''}
          ${horario ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Horario</td><td style="padding:8px;border-bottom:1px solid #eee;">${horario}</td></tr>` : ''}
          ${mensaje ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Mensaje</td><td style="padding:8px;border-bottom:1px solid #eee;">${mensaje}</td></tr>` : ''}
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
