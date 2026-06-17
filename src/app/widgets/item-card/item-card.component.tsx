import { type FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import type { IItem } from '@/app/entities/models'
import { FavoriteToggle } from '@/app/features/favorite-toggle'

interface IProps {
  item: IItem
}

// ItemCard — poster + title + favorite count, reused in list and favorites
const ItemCard: FC<Readonly<IProps>> = (props) => {
  const { item } = props

  return (
    <article className='card'>
      <Link href={`/items/${item.id}`}>
        <Image className='card__poster' src={item.imageUrl || '/placeholder.svg'} alt={item.title} width={300} height={450} />
      </Link>
      <div className='card__body'>
        <Link href={`/items/${item.id}`} className='card__title'>
          {item.title}
        </Link>
        <div className='card__footer'>
          <span className='badge'>♥ {item.favoriteCount}</span>
          <FavoriteToggle item={item} />
        </div>
      </div>
    </article>
  )
}

export default ItemCard
