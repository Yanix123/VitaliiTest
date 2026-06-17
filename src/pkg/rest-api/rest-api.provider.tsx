'use client'

import { type FC, type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'

import { getQueryClient } from './rest-api.service'

interface IProps {
  children: ReactNode
}

// RestApiProvider — mounts the TanStack Query client for the app
const RestApiProvider: FC<Readonly<IProps>> = (props) => {
  const { children } = props
  const queryClient = getQueryClient()

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default RestApiProvider
