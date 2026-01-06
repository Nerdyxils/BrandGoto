/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    MAKE_WEBHOOK_URL: process.env.MAKE_WEBHOOK_URL,
    OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4',
    EMBEDDINGS_MODEL: process.env.EMBEDDINGS_MODEL || 'text-embedding-ada-002',
  },
}

module.exports = nextConfig
