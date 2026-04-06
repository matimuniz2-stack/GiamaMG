import { neon } from '@neondatabase/serverless'

const connectionString = process.env.STORAGE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL
const sql = connectionString ? neon(connectionString) : null

function formatPost(row) {
  return {
    ...row,
    content: typeof row.content === 'string' ? JSON.parse(row.content) : row.content,
  }
}

export async function getAllPosts() {
  if (!sql) return []
  try {
    const rows = await sql`SELECT * FROM posts ORDER BY date DESC`
    return rows.map(formatPost)
  } catch {
    return []
  }
}

export async function getPostBySlug(slug) {
  if (!sql) return null
  try {
    const rows = await sql`SELECT * FROM posts WHERE slug = ${slug} LIMIT 1`
    return rows[0] ? formatPost(rows[0]) : null
  } catch {
    return null
  }
}

export async function createPost({ slug, title, excerpt, content, image, author, date }) {
  const contentJson = JSON.stringify(content)
  const rows = await sql`
    INSERT INTO posts (slug, title, excerpt, content, image, author, date)
    VALUES (${slug}, ${title}, ${excerpt}, ${contentJson}, ${image}, ${author}, ${date})
    RETURNING *
  `
  return formatPost(rows[0])
}

export async function updatePost(slug, { title, excerpt, content, image, author, date }) {
  const contentJson = JSON.stringify(content)
  const rows = await sql`
    UPDATE posts SET
      title = ${title}, excerpt = ${excerpt}, content = ${contentJson},
      image = ${image}, author = ${author}, date = ${date}, updated_at = NOW()
    WHERE slug = ${slug}
    RETURNING *
  `
  return rows[0] ? formatPost(rows[0]) : null
}

export async function deletePost(slug) {
  await sql`DELETE FROM posts WHERE slug = ${slug}`
}
