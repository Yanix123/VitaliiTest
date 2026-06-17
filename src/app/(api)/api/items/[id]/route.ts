import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getItemById } from '@/pkg/db'

// GET /api/items/:id — one item
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params

  if (!z.uuid().safeParse(id).success) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  const item = await getItemById(id)
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(item)
}
