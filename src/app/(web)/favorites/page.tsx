import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { favoritesQueryOptions } from '@/app/entities/api/favorite'
import { FavoritesModule } from '@/app/modules/favorites'
import { ERoute } from '@/app/shared/interfaces'
import { auth, listFavorites } from '@/pkg/db'
import { getQueryClient } from '@/pkg/rest-api'

// page — current user's favorites (server session gate + prefetch)
const Page = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect(ERoute.LOGIN)

  const queryClient = getQueryClient()
  const favorites = await listFavorites(session.user.id)
  queryClient.setQueryData(favoritesQueryOptions().queryKey, favorites)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FavoritesModule />
    </HydrationBoundary>
  )
}

export default Page
