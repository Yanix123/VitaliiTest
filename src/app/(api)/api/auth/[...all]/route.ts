import { toNextJsHandler } from 'better-auth/next-js'

import { auth } from '@/pkg/db'

// Better Auth catch-all handler
export const { GET, POST } = toNextJsHandler(auth)
