'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { itemsQueryOptions } from '@/app/entities/api/item'
import { SkeletonCard } from '@/app/shared/components/skeleton-card'
import { ItemCard } from '@/app/widgets/item-card'

import { PAGE_LIMIT } from './items.constant'

interface ISearchForm {
  q: string
}

// ItemsModule — searchable, paginated catalog list with URL-synced state
const ItemsModule = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const q = searchParams.get('q') ?? ''
  const page = Math.max(1, Number(searchParams.get('page') ?? '1'))

  const { register, handleSubmit, reset } = useForm<ISearchForm>({ defaultValues: { q } })
  const { data, isLoading, isError } = useQuery(itemsQueryOptions({ q, page, limit: PAGE_LIMIT }))

  const onSearch = handleSubmit((values) => {
    const params = new URLSearchParams()
    if (values.q.trim()) params.set('q', values.q.trim())
    router.push(`${pathname}?${params.toString()}`)
  })

  const onClear = () => {
    reset({ q: '' })
    router.push(pathname)
  }

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(p))
    router.push(`${pathname}?${params.toString()}`)
  }

  const total = data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_LIMIT))

  return (
    <div className='container'>
      <div className='toolbar'>
        <form onSubmit={onSearch}>
          <input className='field__input' placeholder='Search movies…' {...register('q')} />
          {q && (
            <button type='button' className='btn' onClick={onClear} aria-label='Clear search'>
              ✕
            </button>
          )}
          <button className='btn' type='submit'>
            Search
          </button>
        </form>
      </div>

      {isError ? <p className='error-text'>Failed to load movies.</p> : null}

      {isLoading ? (
        <div className='grid'>
          {Array.from({ length: PAGE_LIMIT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className='grid'>
          {data?.items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {data && data.items.length === 0 ? <p className='muted'>No movies found.</p> : null}

      <div className='pagination'>
        <button className='btn' disabled={page <= 1} onClick={() => goToPage(page - 1)}>
          Prev
        </button>
        <span className='muted'>
          Page {page} / {totalPages}
        </span>
        <button className='btn' disabled={page >= totalPages} onClick={() => goToPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}

export default ItemsModule
