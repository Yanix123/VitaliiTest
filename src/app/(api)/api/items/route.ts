import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { listItems } from '@/pkg/db'

const querySchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(8),
})

// GET /api/items — paginated, searchable list
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams
  const parsed = querySchema.safeParse({
    q: sp.get('q') ?? undefined,
    page: sp.get('page') ?? undefined,
    limit: sp.get('limit') ?? undefined,
  })

  if (!parsed.success) return NextResponse.json({ error: 'Invalid query' }, { status: 400 })

  const data = await listItems(parsed.data)
  return NextResponse.json(data)
}
