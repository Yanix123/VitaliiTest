'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ERoute } from '@/app/shared/interfaces'
import { signOut, useSession } from '@/pkg/auth-client'

// Header — top nav with auth-aware links
const Header = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const onSignOut = async () => {
    await signOut()
    router.push(ERoute.HOME)
    router.refresh()
  }

  return (
    <header className='header'>
      <div className='header__inner'>
        <Link href={ERoute.HOME} className='header__brand'>
          🎬 Movies
        </Link>
        <nav className='header__nav'>
          <Link href={ERoute.HOME}>Catalog</Link>
          {session?.user ? (
            <>
              <Link href={ERoute.FAVORITES}>Favorites</Link>
              <span className='muted'>{session.user.email}</span>
              <button className='btn' onClick={onSignOut}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href={ERoute.LOGIN}>Log in</Link>
              <Link href={ERoute.REGISTER}>Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
