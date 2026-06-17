# Movies Catalog

A mini full-stack catalog app: browse movies, view details, and save favorites
(per authenticated user).

## Stack

- **Next.js 16** (App Router, Server Components, `proxy.ts`)
- **TanStack Query** — client data/cache, SSR hydration, optimistic favorites
- **react-hook-form** + **zod** — validated auth forms
- **Better Auth** — email/password, mounted in-app at `/api/auth/[...all]`
- **Supabase (Postgres)** accessed only via **Drizzle ORM** + **Drizzle Kit**
- **TypeScript**

The codebase follows a Feature-Sliced Design layout
(`app/{(web),(api),modules,widgets,features,entities,shared}` + `config/` + `pkg/`).

## Routes

| Route                     | Purpose                  | Access        |
| ------------------------- | ------------------------ | ------------- |
| `/`                       | Movie list               | public        |
| `/items/[id]`             | Movie details            | public        |
| `/favorites`              | Current user's favorites | authenticated |
| `/login`                  | Login form               | public        |
| `/register`               | Registration form        | public        |
| `/api/auth/[...all]`      | Better Auth handler      | —             |
| `/api/items`              | List items (Drizzle)     | public        |
| `/api/items/[id]`         | One item (Drizzle)       | public        |
| `/api/favorites`          | GET/POST favorites       | authenticated |
| `/api/favorites/[itemId]` | DELETE favorite          | authenticated |

`/favorites` is gated twice: optimistically in `src/proxy.ts` (cookie check) and
authoritatively in the page via `auth.api.getSession`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Var                   | Description                                                              |
| --------------------- | ------------------------------------------------------------------------ |
| `DATABASE_URL`        | Supabase **pooled** connection (transaction pooler, port 6543) — runtime |
| `DIRECT_URL`          | Supabase **direct** connection (port 5432) — migrations + seed           |
| `BETTER_AUTH_SECRET`  | ≥ 32 chars (`openssl rand -base64 32`)                                   |
| `BETTER_AUTH_URL`     | App origin, e.g. `http://localhost:3000`                                 |
| `NEXT_PUBLIC_APP_URL` | Public app URL for the browser auth client (optional)                    |

`.env.local` is gitignored; never commit secrets.

## Setup

```bash
npm install

# create the schema in Supabase (items, favorites + Better Auth tables)
npm run db:generate   # generate SQL migrations from src/pkg/db/schema.ts
npm run db:migrate    # apply them   (or: npm run db:push for quick local dev)

# seed at least 12 movies
npm run db:seed

# run
npm run dev           # http://localhost:3000
```

## Scripts

| Script                | What it does                           |
| --------------------- | -------------------------------------- |
| `npm run dev`         | Start the dev server                   |
| `npm run build`       | Production build                       |
| `npm run type-check`  | `tsc --noEmit`                         |
| `npm run db:generate` | Generate Drizzle migrations            |
| `npm run db:migrate`  | Apply migrations                       |
| `npm run db:push`     | Push schema directly (dev convenience) |
| `npm run db:seed`     | Insert seed movies                     |

## Data model (Drizzle)

- Better Auth tables: `user`, `session`, `account`, `verification` (text ids).
- `items` — `id` (uuid pk), `title`, `description`, `image_url`, `created_at`.
- `favorites` — `id` (uuid pk), `user_id` (→ `user.id`), `item_id` (→ `items.id`),
  `created_at`, with a unique index on `(user_id, item_id)`.

All access to `items` / `favorites` goes through Drizzle (`src/pkg/db`), used by both
the route handlers and the Server Component prefetch — no `supabase-js`, no raw SQL.
