import { type FC, type ReactNode } from 'react'
import type { Metadata } from 'next'

import { RestApiProvider } from '@/pkg/rest-api'

import '@/config/styles/global.css'

export const metadata: Metadata = {
  title: 'Movies Catalog',
  description: 'Browse movies and save your favorites.',
}

interface IProps {
  children: ReactNode
}

// layout — minimal auth shell: no header, centered content
const AuthLayout: FC<Readonly<IProps>> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <RestApiProvider>{children}</RestApiProvider>
      </body>
    </html>
  )
}

export default AuthLayout
