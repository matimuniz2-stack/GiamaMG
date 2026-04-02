import { MODELS } from '@/data/models'
import ModelPageClient from '@/components/ModelPageClient'

const data = MODELS.zs

export const metadata = {
  title: `${data.name} | Precio, Ficha Técnica y Test Drive — GIAMA Mar del Plata`,
  description: data.description,
  keywords: 'MG ZS Hybrid+, precio MG ZS Argentina, MG ZS ficha técnica, MG ZS Mar del Plata, SUV híbrido, concesionario MG',
  alternates: { canonical: '/modelos/zs' },
  openGraph: {
    title: `${data.name} — Desde ${data.priceFrom} | GIAMA`,
    description: data.description,
    images: [data.exteriorGallery[0].src],
    type: 'website',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.name} — Desde ${data.priceFrom} | GIAMA`,
    description: data.description,
    images: [data.exteriorGallery[0].src],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: data.name,
  description: data.description,
  image: `https://giama-mg.vercel.app${data.exteriorGallery[0].src}`,
  brand: { '@type': 'Brand', name: 'MG Motor' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Comfort',
      price: '27500',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Luxury',
      price: '29900',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  ],
  seller: {
    '@type': 'AutoDealer',
    name: 'GIAMA - Concesionario Oficial MG',
    address: { '@type': 'PostalAddress', addressLocality: 'Mar del Plata', addressCountry: 'AR' },
  },
  vehicleConfiguration: 'Hybrid+',
  fuelType: 'Hybrid',
  vehicleEngine: {
    '@type': 'EngineSpecification',
    enginePower: { '@type': 'QuantitativeValue', value: '191', unitCode: 'BHP' },
    fuelType: 'Hybrid',
  },
}

export default function ZSPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ModelPageClient model="zs" />
    </>
  )
}
