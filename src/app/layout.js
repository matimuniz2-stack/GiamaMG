import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400','600','700','800'] })

export const viewport = {
  themeColor: '#C41230',
}

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://giamamg.com'),
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
    apple: '/logo-mg.png',
  },
  manifest: '/manifest.json',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: 'GIAMA - Concesionario Oficial MG',
  description: 'Concesionario oficial MG en Mar del Plata. Venta de vehículos híbridos MG3 y ZS.',
  url: 'https://giamamg.com',
  logo: 'https://giamamg.com/logo-mg.png',
  image: 'https://giamamg.com/logo-mg.png',
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

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué garantía tienen los vehículos MG?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Todos los vehículos MG cuentan con 6 años o 120.000 km de garantía en el vehículo y hasta 7 años o 140.000 km en la batería híbrida.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Los MG Hybrid+ necesitan enchufe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Tanto el MG3 Hybrid+ como el MG ZS Hybrid+ son Full Hybrid. La batería se recarga sola con el motor de combustión y la frenada regenerativa.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Dónde se encuentra el concesionario GIAMA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GIAMA se encuentra en Gascón 3265, Mar del Plata, Buenos Aires. Horario: lunes a viernes de 9 a 18 hs, sábados de 9 a 13 hs.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo puedo agendar un test drive?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Podés agendar tu test drive completando el formulario en la web, contactando por WhatsApp al +54 9 11 3134 7853 o acercándote al concesionario.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué formas de pago aceptan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aceptamos pago de contado y ofrecemos opciones de financiación. Contactanos para conocer las condiciones vigentes.',
      },
    },
    {
      '@type': 'Question',
      name: '¿MG tiene servicio de postventa en Argentina?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. GIAMA cuenta con servicio técnico oficial MG con técnicos certificados, repuestos originales y mantenimiento según estándares de fábrica.',
      },
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        {/* reCAPTCHA v3 */}
        <Script src="https://www.google.com/recaptcha/api.js?render=6LcBwKMsAAAAALC_0gAjBr_G6d51WaP9VZIymlO1" strategy="afterInteractive" />
        {/* Google Analytics 4 — afterInteractive to avoid blocking render */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-6FBP1JPWE9" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6FBP1JPWE9');
        `}</Script>
        {/* Meta Pixel — afterInteractive */}
        <Script id="fb-pixel" strategy="afterInteractive">{`
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
        `}</Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=948750060897935&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
