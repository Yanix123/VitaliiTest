import type { IItem, IItemsRes } from '@/app/entities/models'
import { apiFetch } from '@/pkg/rest-api'

export interface IListItemsParams {
  q?: string
  page: number
  limit: number
}

// fetch the paginated item list
export const getItems = (params: IListItemsParams) => {
  const sp = new URLSearchParams()
  if (params.q) sp.set('q', params.q)
  sp.set('page', String(params.page))
  sp.set('limit', String(params.limit))
  return apiFetch<IItemsRes>(`/api/items?${sp.toString()}`)
}

// fetch one item by id
export const getItem = (id: string) => apiFetch<IItem>(`/api/items/${id}`)
