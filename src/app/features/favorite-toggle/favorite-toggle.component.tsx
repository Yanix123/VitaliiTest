'use client'

import { type FC, useMemo } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import {
  favoritesQueryOptions,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from '@/app/entities/api/favorite'
import type { IItem } from '@/app/entities/models'
import { ERoute } from '@/app/shared/interfaces'
import { useSession } from '@/pkg/auth-client'

interface IProps {
  item: IItem
}

// FavoriteToggle — add/remove the item for the signed-in user (optimistic)
const FavoriteToggle: FC<Readonly<IProps>> = (props) => {
  const { item } = props

  const { data: session, isPending } = useSession()
  const { data: favorites } = useQuery({ ...favoritesQueryOptions(), enabled: Boolean(session?.user) })
  const add = useAddFavoriteMutation()
  const remove = useRemoveFavoriteMutation()

  const favoritesSet = useMemo(() => new Set(favorites?.map((i) => i.id) ?? []), [favorites])

  if (isPending) return null

  if (!session?.user) {
    return (
      <Link className='btn' href={ERoute.LOGIN}>
        ♡ Log in to favorite
      </Link>
    )
  }
  const isFavorite = favoritesSet.has(item.id)
  const mutating = add.isPending || remove.isPending

  const onClick = () => {
    if (isFavorite) remove.mutate(item.id)
    else add.mutate(item)
  }

  return (
    <button className={`btn ${isFavorite ? 'btn--accent' : ''}`} onClick={onClick} disabled={mutating}>
      {isFavorite ? '★ In favorites' : '☆ Add to favorite'}
    </button>
  )
}

export default FavoriteToggle
