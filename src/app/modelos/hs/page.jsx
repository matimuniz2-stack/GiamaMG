import { MODELS } from '@/data/models'
import ModelPageClient from '@/components/ModelPageClient'

const data = MODELS.hs

export const metadata = {
  title: `${data.name} | Próximamente — GIAMA Mar del Plata`,
  description: data.description,
  keywords: 'MG HS, nueva MG HS, MG HS Argentina, MG HS Mar del Plata, SUV familiar MG, concesionario MG',
  alternates: { canonical: '/modelos/hs' },
  openGraph: {
    title: `Se viene la ${data.name} | GIAMA`,
    description: data.description,
    images: ['/HS/Portada.webp'],
    type: 'website',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Se viene la ${data.name} | GIAMA`,
    description: data.description,
    images: ['/HS/Portada.webp'],
  },
}

// Sin Offer: todavía no hay precio confirmado.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'MG HS',
  description: data.description,
  image: `${process.env.NEXT_PUBLIC_SITE_URL}${data.exteriorGallery[0].src}`,
  brand: { '@type': 'Brand', name: 'MG Motor' },
}

export default function HSPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ModelPageClient model="hs" />
    </>
  )
}
