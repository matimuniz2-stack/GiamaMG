import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Página no encontrada | GIAMA MG',
}

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #1B1B1B 0%, #2d0a10 100%)',
      color: '#fff',
    }}>
      <Image src="/logo-mg.png" alt="MG Logo" width={80} height={80} priority />
      <h1 style={{ fontSize: 96, fontWeight: 800, margin: '24px 0 0', lineHeight: 1 }}>404</h1>
      <p style={{ fontSize: 20, opacity: 0.7, margin: '12px 0 32px', maxWidth: 400 }}>
        La página que buscás no existe o fue movida.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{
          display: 'inline-block',
          padding: '12px 32px',
          background: '#1B365D',
          color: '#fff',
          borderRadius: 8,
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: 14,
        }}>
          Ir al inicio
        </Link>
        <Link href="/modelos/mg3" style={{
          display: 'inline-block',
          padding: '12px 32px',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff',
          borderRadius: 8,
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 14,
        }}>
          Ver MG3
        </Link>
        <Link href="/modelos/zs" style={{
          display: 'inline-block',
          padding: '12px 32px',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff',
          borderRadius: 8,
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 14,
        }}>
          Ver MG ZS
        </Link>
      </div>
      <p style={{ fontSize: 12, opacity: 0.4, marginTop: 48 }}>
        GIAMA — Concesionario Oficial MG en Mar del Plata
      </p>
    </div>
  )
}
