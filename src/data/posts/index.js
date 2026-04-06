// Importá cada post nuevo acá y agregalo al array.
// Para crear un post: copiá un JSON existente, cambiá el contenido, importalo acá.

const posts = []

export function getAllPosts() {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) || null
}
