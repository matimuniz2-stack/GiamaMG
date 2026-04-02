import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { getAllPosts, getPostBySlug } from '@/data/posts'

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Blog GIAMA MG`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      locale: 'es_AR',
    },
  }
}

export default function BlogPost({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://giama-mg.vercel.app${post.image}`,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'GIAMA - Concesionario Oficial MG' },
  }

  return (
    <div className="blog-page">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="blog-article" style={{ paddingTop: 100 }}>
        <div className="blog-article-header">
          <Link href="/blog" className="blog-back">← Volver al blog</Link>
          <h1>{post.title}</h1>
          <div className="blog-meta">
            <span>{new Date(post.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>•</span>
            <span>{post.author}</span>
          </div>
        </div>
        <div className="blog-article-img">
          <Image src={post.image} alt={post.title} width={1200} height={600} style={{ objectFit: 'cover', width: '100%', height: 'auto', borderRadius: 12 }} priority />
        </div>
        <div className="blog-article-content">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <div className="blog-article-cta">
          <p>¿Te interesa conocer más sobre MG?</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/#test-drive" className="btn-primary">Agendar Test Drive</Link>
            <Link href="/#contacto" className="btn-outline-dark">Solicitar Cotización</Link>
          </div>
        </div>
      </article>
    </div>
  )
}
