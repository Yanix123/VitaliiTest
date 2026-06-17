import type { IItem } from '@/app/entities/models'
import { apiFetch } from '@/pkg/rest-api'

// fetch the current user's favorited items
export const getFavorites = () => apiFetch<IItem[]>('/api/favorites')

// add an item to favorites
export const addFavorite = (itemId: string) =>
  apiFetch<{ ok: true }>('/api/favorites', { method: 'POST', body: JSON.stringify({ itemId }) })

// remove an item from favorites
export const removeFavorite = (itemId: string) => apiFetch<void>(`/api/favorites/${itemId}`, { method: 'DELETE' })
