import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400','600','700','800'] })

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://giama-mg.vercel.app'),
  title: 'GIAMA | Concesionario Oficial MG en Mar del Plata',
  description: 'Concesionario oficial MG en Mar del Plata. MG3 Hybrid+ y ZS Hybrid+. Test drive, cotización y postventa. Grupo GIAMA, más de 40 años en el mercado automotor.',
  keywords: 'MG, GIAMA, concesionario, Mar del Plata, MG3, ZS, híbrido, test drive',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GIAMA | Concesionario Oficial MG en Mar del Plata',
    description: 'MG3 Hybrid+ y ZS Hybrid+. Test drive, cotización y postventa en Mar del Plata.',
    images: ['/logo-mg.png'],
    type: 'website',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GIAMA | Concesionario Oficial MG en Mar del Plata',
    description: 'MG3 Hybrid+ y ZS Hybrid+. Test drive, cotización y postventa en Mar del Plata.',
    images: ['/logo-mg.png'],
  },
  icons: {
    icon: '/logo-mg.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: 'GIAMA - Concesionario Oficial MG',
  description: 'Concesionario oficial MG en Mar del Plata. Venta de vehículos híbridos MG3 y ZS.',
  url: 'https://giama-mg.vercel.app',
  logo: 'https://giama-mg.vercel.app/logo-mg.png',
  image: 'https://giama-mg.vercel.app/logo-mg.png',
  telephone: '+5491131347853',
  email: 'info@giamamg.com.ar',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Gascón 3265',
    addressLocality: 'Mar del Plata',
    addressRegion: 'Buenos Aires',
    postalCode: '7600',
    addressCountry: 'AR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -38.0055,
    longitude: -57.5426,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '13:00',
    },
  ],
  brand: {
    '@type': 'Brand',
    name: 'MG Motor',
  },
  areaServed: {
    '@type': 'City',
    name: 'Mar del Plata',
  },
  priceRange: 'USD 23,500 - USD 29,900',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '948750060897935');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=948750060897935&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
