import { headers } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { addFavorite, auth, listFavorites } from '@/pkg/db'

const bodySchema = z.object({ itemId: z.uuid() })

// GET /api/favorites — current user's favorites
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await listFavorites(session.user.id)
  return NextResponse.json(data)
}

// POST /api/favorites — add a favorite
export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = bodySchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  await addFavorite(session.user.id, parsed.data.itemId)
  return NextResponse.json({ ok: true })
}
