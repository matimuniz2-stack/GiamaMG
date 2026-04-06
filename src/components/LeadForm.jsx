'use client'

import { useState, useEffect, useRef } from 'react'

const VERSIONES = {
  'MG3 Hybrid+': ['Comfort', 'Luxury'],
  'MG ZS Hybrid+': ['Comfort', 'Luxury'],
}

export default function LeadForm({ tipo }) {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [modelo, setModelo] = useState('')
  const resetTimerRef = useRef(null)

  const versiones = VERSIONES[modelo] || []

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.target
    const data = {
      tipo,
      nombre: form.nombre.value,
      email: form.email.value,
      telefono: form.telefono.value,
      modelo: form.modelo.value,
    }

    if (tipo === 'test-drive') {
      data.fecha = form.fecha.value
      data.horario = form.horario.value
      data.mensaje = form.mensaje?.value || ''
    } else {
      data.version = form.version?.value || ''
      data.formaPago = form.formaPago?.value || ''
      data.mensaje = form.mensaje?.value || ''
    }

    try {
      // reCAPTCHA v3 token
      let recaptchaToken = ''
      if (typeof window !== 'undefined' && window.grecaptcha) {
        try {
          recaptchaToken = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit_lead' })
        } catch (err) { console.warn('reCAPTCHA falló, enviando sin token:', err) }
      }
      data.recaptchaToken = recaptchaToken

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
        setModelo('')
        // Conversion tracking
        if (typeof window !== 'undefined') {
          // Meta Pixel
          if (window.fbq) {
            window.fbq('track', 'Lead', { content_name: data.modelo, content_category: tipo })
            if (tipo === 'test-drive') {
              window.fbq('track', 'Schedule', { content_name: data.modelo })
            }
          }
          // Google Analytics 4
          if (window.gtag) {
            window.gtag('event', 'generate_lead', {
              event_category: tipo,
              event_label: data.modelo,
              value: tipo === 'test-drive' ? 1 : 2,
            })
          }
        }
        resetTimerRef.current = setTimeout(() => setStatus('idle'), 5000)
      } else {
        const err = await res.json()
        setErrorMsg(err.error || 'Error al enviar')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Error de conexión. Intentá de nuevo.')
      setStatus('error')
    }
  }

  if (tipo === 'test-drive') {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="td-nombre">Nombre completo</label>
            <input type="text" id="td-nombre" name="nombre" required placeholder="Tu nombre" />
          </div>
          <div className="form-field">
            <label htmlFor="td-telefono">Teléfono</label>
            <input type="tel" id="td-telefono" name="telefono" required placeholder="+54 9 223..." />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="td-email">Email</label>
            <input type="email" id="td-email" name="email" required placeholder="tu@email.com" />
          </div>
          <div className="form-field">
            <label htmlFor="td-modelo">Modelo de interés</label>
            <select id="td-modelo" name="modelo" required value={modelo} onChange={(e) => setModelo(e.target.value)}>
              <option value="">Seleccionar modelo</option>
              <option value="MG3 Hybrid+">MG3 Hybrid+</option>
              <option value="MG ZS Hybrid+">MG ZS Hybrid+</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="td-fecha">Fecha preferida</label>
            <input type="date" id="td-fecha" name="fecha" required min={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="form-field">
            <label htmlFor="td-horario">Horario</label>
            <select id="td-horario" name="horario" required>
              <option value="">Seleccionar</option>
              <option value="Mañana">Mañana (9 a 13 hs)</option>
              <option value="Tarde">Tarde (13 a 18 hs)</option>
            </select>
          </div>
        </div>
        <div className="form-row full">
          <div className="form-field">
            <label htmlFor="td-mensaje">Mensaje adicional (opcional)</label>
            <textarea id="td-mensaje" name="mensaje" placeholder="Algún dato que quieras agregar..."></textarea>
          </div>
        </div>
        <button type="submit" className="btn-submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Enviando...' : 'Solicitar Test Drive'}
        </button>
        {status === 'success' && <div className="form-success">Solicitud enviada. Nos pondremos en contacto pronto.</div>}
        {status === 'error' && <div className="form-error">{errorMsg}</div>}
      </form>
    )
  }

  // Cotización
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="q-nombre">Nombre completo</label>
          <input type="text" id="q-nombre" name="nombre" required placeholder="Tu nombre" />
        </div>
        <div className="form-field">
          <label htmlFor="q-telefono">Teléfono</label>
          <input type="tel" id="q-telefono" name="telefono" required placeholder="+54 9 223..." />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="q-email">Email</label>
          <input type="email" id="q-email" name="email" required placeholder="tu@email.com" />
        </div>
        <div className="form-field">
          <label htmlFor="q-modelo">Modelo</label>
          <select id="q-modelo" name="modelo" required value={modelo} onChange={(e) => setModelo(e.target.value)}>
            <option value="">Seleccionar modelo</option>
            <option value="MG3 Hybrid+">MG3 Hybrid+</option>
            <option value="MG ZS Hybrid+">MG ZS Hybrid+</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="q-version">Versión</label>
          <select id="q-version" name="version" disabled={!modelo}>
            <option value="">{modelo ? 'Seleccionar versión' : 'Elegí un modelo primero'}</option>
            {versiones.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
            <option value="Otra">Otra / No sé</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="q-formaPago">Forma de pago</label>
          <select id="q-formaPago" name="formaPago">
            <option value="">Seleccionar</option>
            <option value="Contado">Contado</option>
            <option value="Financiación">Financiación</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>
      <div className="form-row full">
        <div className="form-field">
          <label htmlFor="q-mensaje">Mensaje</label>
          <textarea id="q-mensaje" name="mensaje" placeholder="Contanos más sobre lo que buscás..."></textarea>
        </div>
      </div>
      <button type="submit" className="btn-submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Enviando...' : 'Solicitar Cotización'}
      </button>
      {status === 'success' && <div className="form-success">Solicitud enviada. Te enviaremos la cotización a la brevedad.</div>}
      {status === 'error' && <div className="form-error">{errorMsg}</div>}
    </form>
  )
}
