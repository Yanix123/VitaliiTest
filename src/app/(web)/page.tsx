import { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { itemsQueryOptions } from '@/app/entities/api/item'
import { ItemsModule, PAGE_LIMIT } from '@/app/modules/items'
import { listItems } from '@/pkg/db'
import { getQueryClient } from '@/pkg/rest-api'

// render per request — reflects live favorite counts and URL-driven q/page
export const dynamic = 'force-dynamic'

interface IPageProps {
  searchParams: Promise<{ q?: string; page?: string }>
}

// page — catalog list (server-prefetched with URL params, hydrated into TanStack Query)
const Page = async ({ searchParams }: IPageProps) => {
  const { q = '', page: pageStr = '1' } = await searchParams
  const page = Math.max(1, Number(pageStr))

  const queryClient = getQueryClient()
  const data = await listItems({ q: q || undefined, page, limit: PAGE_LIMIT })
  queryClient.setQueryData(itemsQueryOptions({ q, page, limit: PAGE_LIMIT }).queryKey, data)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <ItemsModule />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page
