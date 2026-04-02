import { MODELS } from '@/data/models'
import ModelPageClient from '@/components/ModelPageClient'

const data = MODELS.mg3

export const metadata = {
  title: `${data.name} | Precio, Ficha Técnica y Test Drive — GIAMA Mar del Plata`,
  description: data.description,
  keywords: 'MG3 Hybrid+, precio MG3 Argentina, MG3 ficha técnica, MG3 Mar del Plata, concesionario MG, test drive MG3',
  alternates: { canonical: '/modelos/mg3' },
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
  offers: {
    '@type': 'Offer',
    price: '23500',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'AutoDealer',
      name: 'GIAMA - Concesionario Oficial MG',
      address: { '@type': 'PostalAddress', addressLocality: 'Mar del Plata', addressCountry: 'AR' },
    },
  },
  vehicleConfiguration: 'Full Hybrid',
  fuelType: 'Hybrid',
  vehicleEngine: {
    '@type': 'EngineSpecification',
    enginePower: { '@type': 'QuantitativeValue', value: '195', unitCode: 'BHP' },
    fuelType: 'Hybrid',
  },
}

export default function MG3Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ModelPageClient model="mg3" />
    </>
  )
}
