'use client'

export default function Error({ reset }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center',
      background: '#1B1B1B',
      color: '#fff',
    }}>
      <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 12 }}>Algo salió mal</h1>
      <p style={{ fontSize: 16, opacity: 0.7, marginBottom: 32, maxWidth: 400 }}>
        Ocurrió un error inesperado. Podés intentar de nuevo o volver al inicio.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={reset}
          style={{
            padding: '12px 32px',
            background: '#C41230',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          Intentar de nuevo
        </button>
        <a href="/" style={{
          display: 'inline-block',
          padding: '12px 32px',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff',
          borderRadius: 8,
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 14,
        }}>
          Ir al inicio
        </a>
      </div>
      <p style={{ fontSize: 12, opacity: 0.4, marginTop: 48 }}>
        GIAMA — Concesionario Oficial MG en Mar del Plata
      </p>
    </div>
  )
}
