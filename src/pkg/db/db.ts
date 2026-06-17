import 'server-only'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { envServer } from '@/config/env'

import * as schema from './schema'

// pooled connection (Supabase transaction pooler needs prepare: false)
const client = postgres(envServer.DATABASE_URL, { prepare: false })

// drizzle client — the only DB handle the app uses
export const db = drizzle(client, { schema })
