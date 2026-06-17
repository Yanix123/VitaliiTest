import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { items } from '../src/pkg/db/schema'

// seed — self-contained: own client over the direct connection, schema imported by relative path
process.loadEnvFile('.env.local')

const MOVIES = [
  {
    title: 'The Shawshank Redemption',
    description:
      'Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency.',
    imageUrl: 'https://picsum.photos/seed/shawshank/400/600',
  },
  {
    title: 'The Godfather',
    description: 'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.',
    imageUrl: 'https://picsum.photos/seed/godfather/400/600',
  },
  {
    title: 'The Dark Knight',
    description: 'Batman faces the Joker, a criminal mastermind who plunges Gotham City into anarchy.',
    imageUrl: 'https://picsum.photos/seed/darkknight/400/600',
  },
  {
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in four tales.',
    imageUrl: 'https://picsum.photos/seed/pulpfiction/400/600',
  },
  {
    title: 'Forrest Gump',
    description: 'The history of the United States unfolds through the perspective of an Alabama man with a low IQ.',
    imageUrl: 'https://picsum.photos/seed/forrestgump/400/600',
  },
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through dream-sharing is given the chance to erase his past.',
    imageUrl: 'https://picsum.photos/seed/inception/400/600',
  },
  {
    title: 'The Matrix',
    description: 'A hacker learns the true nature of his reality and his role in the war against its controllers.',
    imageUrl: 'https://picsum.photos/seed/matrix/400/600',
  },
  {
    title: 'Goodfellas',
    description: 'The rise and fall of a mob associate over three decades of life in the mafia.',
    imageUrl: 'https://picsum.photos/seed/goodfellas/400/600',
  },
  {
    title: 'Interstellar',
    description: 'Explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.',
    imageUrl: 'https://picsum.photos/seed/interstellar/400/600',
  },
  {
    title: 'Parasite',
    description: 'Greed and class discrimination threaten the symbiotic relationship between two families.',
    imageUrl: 'https://picsum.photos/seed/parasite/400/600',
  },
  {
    title: 'Spirited Away',
    description: 'A girl wanders into a world of spirits and must work to free herself and her parents.',
    imageUrl: 'https://picsum.photos/seed/spiritedaway/400/600',
  },
  {
    title: 'Whiplash',
    description: 'A young drummer enrolls at a cut-throat music conservatory under a ruthless instructor.',
    imageUrl: 'https://picsum.photos/seed/whiplash/400/600',
  },
]

async function main() {
  const sql = postgres(process.env.DIRECT_URL!, { prepare: false })
  const db = drizzle(sql, { schema: { items } })

  await db.insert(items).values(MOVIES)
  const all = await db.select().from(items)

  console.log(`Seeded. items table now has ${all.length} rows.`)
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
