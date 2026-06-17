import { queryOptions } from '@tanstack/react-query'

import { EEntityKey } from '@/app/shared/interfaces'

import { getItem, getItems, type IListItemsParams } from './item.api'

// items list query (keyed by params for search + pagination)
export const itemsQueryOptions = (params: IListItemsParams) =>
  queryOptions({
    queryKey: [EEntityKey.ITEMS, params],
    queryFn: () => getItems(params),
    staleTime: 5 * 60 * 1000,
  })

// single item query
export const itemQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [EEntityKey.ITEM, id],
    queryFn: () => getItem(id),
    staleTime: 5 * 60 * 1000,
  })
