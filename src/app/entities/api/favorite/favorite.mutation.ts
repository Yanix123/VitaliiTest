'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { IItem } from '@/app/entities/models'
import { useToast } from '@/app/shared/components/toast'
import { EEntityKey } from '@/app/shared/interfaces'

import { addFavorite, removeFavorite } from './favorite.api'

interface IContext {
  prev: IItem[] | undefined
}

// invalidate everything that shows favorite state / counts
const invalidateAll = (qc: ReturnType<typeof useQueryClient>) => {
  qc.invalidateQueries({ queryKey: [EEntityKey.FAVORITES] })
  qc.invalidateQueries({ queryKey: [EEntityKey.ITEMS] })
  qc.invalidateQueries({ queryKey: [EEntityKey.ITEM] })
}

// add to favorites — optimistic insert with rollback
export const useAddFavoriteMutation = () => {
  const qc = useQueryClient()
  const toast = useToast()

  return useMutation<{ ok: true }, Error, IItem, IContext>({
    mutationFn: (item) => addFavorite(item.id),
    onMutate: async (item) => {
      await qc.cancelQueries({ queryKey: [EEntityKey.FAVORITES] })
      const prev = qc.getQueryData<IItem[]>([EEntityKey.FAVORITES])
      qc.setQueryData<IItem[]>([EEntityKey.FAVORITES], (old) => {
        const list = old ?? []
        if (list.some((i) => i.id === item.id)) return list
        return [{ ...item, favoriteCount: item.favoriteCount + 1 }, ...list]
      })
      return { prev }
    },
    onSuccess: () => {
      invalidateAll(qc)
      toast.addToast('Added to favorites', 'success')
    },
    onError: (_err, _item, ctx) => {
      if (ctx?.prev) qc.setQueryData([EEntityKey.FAVORITES], ctx.prev)
      qc.invalidateQueries({ queryKey: [EEntityKey.FAVORITES] })
      toast.addToast('Failed to add to favorites', 'error')
    },
  })
}

// remove from favorites — optimistic removal with rollback
export const useRemoveFavoriteMutation = () => {
  const qc = useQueryClient()
  const toast = useToast()

  return useMutation<void, Error, string, IContext>({
    mutationFn: (itemId) => removeFavorite(itemId),
    onMutate: async (itemId) => {
      await qc.cancelQueries({ queryKey: [EEntityKey.FAVORITES] })
      const prev = qc.getQueryData<IItem[]>([EEntityKey.FAVORITES])
      qc.setQueryData<IItem[]>([EEntityKey.FAVORITES], (old) => (old ?? []).filter((i) => i.id !== itemId))
      return { prev }
    },
    onSuccess: () => {
      invalidateAll(qc)
      toast.addToast('Removed from favorites', 'success')
    },
    onError: (_err, _itemId, ctx) => {
      if (ctx?.prev) qc.setQueryData([EEntityKey.FAVORITES], ctx.prev)
      qc.invalidateQueries({ queryKey: [EEntityKey.FAVORITES] })
      toast.addToast('Failed to remove from favorites', 'error')
    },
  })
}
