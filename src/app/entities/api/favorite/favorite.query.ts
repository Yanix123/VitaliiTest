import { queryOptions } from '@tanstack/react-query'

import { EEntityKey } from '@/app/shared/interfaces'

import { getFavorites } from './favorite.api'

// current user's favorites query
export const favoritesQueryOptions = () =>
  queryOptions({
    queryKey: [EEntityKey.FAVORITES],
    queryFn: getFavorites,
    staleTime: 0,
  })
