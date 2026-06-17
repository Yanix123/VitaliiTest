import { z } from 'zod'

// client env schema — only NEXT_PUBLIC_* vars (inlined by Next at build)
const schema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().min(1).optional(),
})

// envClient — the single place public vars are read
export const envClient = schema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
})
