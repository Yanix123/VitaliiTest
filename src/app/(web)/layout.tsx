import { type FC, type ReactNode } from 'react'
import type { Metadata } from 'next'

import { ToastProvider } from '@/app/shared/components/toast'
import { Header } from '@/app/widgets/header'
import { RestApiProvider } from '@/pkg/rest-api'

import '@/config/styles/global.css'

export const metadata: Metadata = {
  title: 'Movies Catalog',
  description: 'Browse movies and save your favorites.',
}

interface IProps {
  children: ReactNode
}

// layout — root shell: html/body, query provider, header
const RootLayout: FC<Readonly<IProps>> = (props) => {
  const { children } = props

  return (
    <html lang='en'>
      <body>
        <ToastProvider>
          <RestApiProvider>
            <Header />
            {children}
          </RestApiProvider>
        </ToastProvider>
      </body>
    </html>
  )
}

export default RootLayout
