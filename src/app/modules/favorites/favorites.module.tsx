'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import { favoritesQueryOptions } from '@/app/entities/api/favorite'
import { SkeletonCard } from '@/app/shared/components/skeleton-card'
import { ERoute } from '@/app/shared/interfaces'
import { ItemCard } from '@/app/widgets/item-card'

const SKELETON_COUNT = 4

// FavoritesModule — the current user's favorited movies
const FavoritesModule = () => {
  const { data, isLoading, isError } = useQuery(favoritesQueryOptions())

  return (
    <div className='container'>
      <h1>Your favorites</h1>

      {isError ? <p className='error-text'>Failed to load favorites. Please try again.</p> : null}

      {isLoading ? (
        <div className='grid'>
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : null}

      {!isLoading && !isError && data?.length === 0 ? (
        <div className='empty-state'>
          <p className='muted'>No favorites yet.</p>
          <Link href={ERoute.HOME} className='btn btn--accent'>
            Browse catalog
          </Link>
        </div>
      ) : null}

      {!isLoading && data && data.length > 0 ? (
        <div className='grid'>
          {data.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default FavoritesModule
