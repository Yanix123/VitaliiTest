import 'server-only'

import { and, desc, eq, sql } from 'drizzle-orm'

import { db } from './db'
import { favorites, items } from './schema'

const favoriteCount = sql<number>`(select count(*)::int from ${favorites} where ${favorites.itemId} = ${items.id})`

// list a user's favorited items (joined to item data), newest first
export async function listFavorites(userId: string) {
  return db
    .select({
      id: items.id,
      title: items.title,
      description: items.description,
      imageUrl: items.imageUrl,
      favoriteCount,
    })
    .from(favorites)
    .innerJoin(items, eq(favorites.itemId, items.id))
    .where(eq(favorites.userId, userId))
    .orderBy(desc(favorites.createdAt))
}

// add a favorite (idempotent via the unique (user_id, item_id) index)
export async function addFavorite(userId: string, itemId: string) {
  await db.insert(favorites).values({ userId, itemId }).onConflictDoNothing()
}

// remove a favorite (scoped to the owning user)
export async function removeFavorite(userId: string, itemId: string) {
  await db.delete(favorites).where(and(eq(favorites.userId, userId), eq(favorites.itemId, itemId)))
}
