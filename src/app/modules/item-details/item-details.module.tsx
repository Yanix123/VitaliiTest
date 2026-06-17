'use client'

import { type FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import { itemQueryOptions } from '@/app/entities/api/item'
import { FavoriteToggle } from '@/app/features/favorite-toggle'
import { ERoute } from '@/app/shared/interfaces'

interface IProps {
  id: string
}

const SkeletonDetails = () => (
  <div className='details'>
    <div className='details__poster skeleton' style={{ aspectRatio: '2/3' }} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className='skeleton skeleton-line' style={{ height: 32, width: '70%' }} />
      <div className='skeleton skeleton-line skeleton-line--short' />
      <div className='skeleton skeleton-line' style={{ height: 80 }} />
    </div>
  </div>
)

// ItemDetailsModule — full info for one movie + favorite toggle
const ItemDetailsModule: FC<Readonly<IProps>> = (props) => {
  const { id } = props
  const { data: item, isLoading, isError } = useQuery(itemQueryOptions(id))

  if (isLoading) return <SkeletonDetails />
  if (isError || !item) return <p className='error-text'>Movie not found.</p>

  return (
    <>
      <Link href={ERoute.HOME} className='btn back-btn'>
        ← Back to catalog
      </Link>
      <div className='details'>
        <Image className='details__poster' src={item.imageUrl || '/placeholder.svg'} alt={item.title} width={400} height={600} />
        <div>
          <h1>{item.title}</h1>
          <p className='badge'>♥ {item.favoriteCount} favorites</p>
          <p>{item.description}</p>
          <FavoriteToggle item={item} />
        </div>
      </div>
    </>
  )
}

export default ItemDetailsModule
