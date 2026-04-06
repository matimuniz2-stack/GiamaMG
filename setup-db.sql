-- Ejecutar este SQL en la consola de Vercel Postgres
-- Dashboard de Vercel > Storage > Tu base de datos > Query

CREATE TABLE IF NOT EXISTS posts (
  id         SERIAL PRIMARY KEY,
  slug       VARCHAR(255) UNIQUE NOT NULL,
  title      VARCHAR(500) NOT NULL,
  excerpt    TEXT NOT NULL,
  content    TEXT NOT NULL,
  image      VARCHAR(1000) NOT NULL,
  author     VARCHAR(255) NOT NULL DEFAULT 'GIAMA',
  date       DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
