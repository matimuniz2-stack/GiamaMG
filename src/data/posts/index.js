// Importá cada post nuevo acá y agregalo al array.
// Para crear un post: copiá un JSON existente, cambiá el contenido, importalo acá.
import post1 from './mg-llega-a-argentina.json'
import post2 from './mg3-vs-competencia.json'
import post3 from './que-es-full-hybrid.json'

const posts = [post1, post2, post3]

export function getAllPosts() {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) || null
}
