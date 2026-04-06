import { getAllPosts } from '@/data/posts'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://giamamg.com'

export default async function sitemap() {
  const allPosts = await getAllPosts()
  const posts = allPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/modelos/mg3`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/modelos/zs`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...posts,
  ]
}
