import { notFound } from 'next/navigation'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { z } from 'zod'

import { itemQueryOptions } from '@/app/entities/api/item'
import { ItemDetailsModule } from '@/app/modules/item-details'
import { getItemById } from '@/pkg/db'
import { getQueryClient } from '@/pkg/rest-api'

interface IProps {
  params: Promise<{ id: string }>
}

// render per request — reflects live favorite counts from the DB
export const dynamic = 'force-dynamic'

// page — single movie details (server-prefetched)
const Page = async (props: IProps) => {
  const { id } = await props.params
  if (!z.uuid().safeParse(id).success) notFound()

  const item = await getItemById(id)
  if (!item) notFound()

  const queryClient = getQueryClient()
  queryClient.setQueryData(itemQueryOptions(id).queryKey, item)

  return (
    <div className='container'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ItemDetailsModule id={id} />
      </HydrationBoundary>
    </div>
  )
}

export default Page
