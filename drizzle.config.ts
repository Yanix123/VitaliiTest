import { defineConfig } from 'drizzle-kit'

// load .env.local for CLI tooling (Next loads it for the app automatically)
process.loadEnvFile('.env.local')

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/pkg/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    // direct (non-pooled) connection for migrations
    url: process.env.DIRECT_URL!,
  },
})
