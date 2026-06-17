import { cache } from 'react'

import { defaultShouldDehydrateQuery, isServer, QueryClient } from '@tanstack/react-query'

let browserQueryClient: QueryClient | undefined = undefined

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
  })

// one memoized instance per server request — prevents cross-request contamination
const getServerQueryClient = cache(makeQueryClient)

// getQueryClient — per-request singleton on the server, shared singleton in the browser
export const getQueryClient = () => {
  if (isServer) return getServerQueryClient()
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}
