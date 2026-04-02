import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['300','400','500','600','700','800','900'] })

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://giama-mg.vercel.app'),
  title: 'GIAMA | Concesionario Oficial MG en Mar del Plata',
  description: 'Concesionario oficial MG en Mar del Plata. MG3 Hybrid+ y ZS Hybrid+. Test drive, cotización y postventa. Grupo GIAMA, más de 40 años en el mercado automotor.',
  keywords: 'MG, GIAMA, concesionario, Mar del Plata, MG3, ZS, híbrido, test drive',
  openGraph: {
    title: 'GIAMA | Concesionario Oficial MG en Mar del Plata',
    description: 'MG3 Hybrid+ y ZS Hybrid+. Test drive, cotización y postventa en Mar del Plata.',
    images: ['/logo-mg.png'],
    type: 'website',
    locale: 'es_AR',
  },
  icons: {
    icon: '/logo-mg.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
