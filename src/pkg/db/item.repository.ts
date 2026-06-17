import 'server-only'

import { count, desc, eq, ilike, sql } from 'drizzle-orm'

import { db } from './db'
import { favorites, items } from './schema'

// favoriteCount as a correlated subquery (int → number)
const favoriteCount = sql<number>`(select count(*)::int from ${favorites} where ${favorites.itemId} = ${items.id})`

const itemColumns = {
  id: items.id,
  title: items.title,
  description: items.description,
  imageUrl: items.imageUrl,
  favoriteCount,
}

interface IListItemsArgs {
  q?: string
  page: number
  limit: number
}

// list items — search by title + pagination, newest first
export async function listItems(args: IListItemsArgs) {
  const { q, page, limit } = args
  const where = q ? ilike(items.title, `%${q}%`) : undefined
  const offset = (page - 1) * limit

  const [rows, [{ value: total }]] = await Promise.all([
    db.select(itemColumns).from(items).where(where).orderBy(desc(items.createdAt)).limit(limit).offset(offset),
    db.select({ value: count() }).from(items).where(where),
  ])

  return { items: rows, total }
}

// get one item by id (+ favoriteCount)
export async function getItemById(id: string) {
  const [row] = await db.select(itemColumns).from(items).where(eq(items.id, id)).limit(1)
  return row ?? null
}
