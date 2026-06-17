import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { auth, removeFavorite } from '@/pkg/db'

// DELETE /api/favorites/:itemId — remove a favorite (scoped to the owner)
export async function DELETE(_req: Request, ctx: { params: Promise<{ itemId: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { itemId } = await ctx.params
  if (!z.uuid().safeParse(itemId).success) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  await removeFavorite(session.user.id, itemId)
  return new NextResponse(null, { status: 204 })
}
