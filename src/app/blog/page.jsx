import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import { getAllPosts } from '@/data/posts'

export const metadata = {
  title: 'Blog | GIAMA — Concesionario Oficial MG en Mar del Plata',
  description: 'Novedades, comparativas y guías sobre MG, tecnología híbrida y el mercado automotor argentino.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | GIAMA MG',
    description: 'Novedades, comparativas y guías sobre MG, tecnología híbrida y el mercado automotor argentino.',
    type: 'website',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | GIAMA MG',
    description: 'Novedades, comparativas y guías sobre MG, tecnología híbrida y el mercado automotor argentino.',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="blog-page">
      <Navbar />
      <section className="section" style={{ paddingTop: 120 }}>
        <p className="section-tag">Blog</p>
        <h1 className="section-title">Novedades MG</h1>
        <p className="section-subtitle">Noticias, comparativas y guías sobre tecnología híbrida y el mundo MG.</p>

        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', fontSize: 16, marginTop: 40 }}>Próximamente publicaremos novedades. ¡Volvé pronto!</p>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-card">
                <div className="blog-card-img">
                  <Image src={post.image} alt={post.title} width={600} height={340} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </div>
                <div className="blog-card-body">
                  <span className="blog-card-date">{new Date(post.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <span className="blog-card-link">Leer más →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
