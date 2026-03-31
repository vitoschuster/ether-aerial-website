'use client'

import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mediaQueryList = window.matchMedia(query)
      const handler = () => onStoreChange()
      mediaQueryList.addEventListener('change', handler)
      return () => mediaQueryList.removeEventListener('change', handler)
    },
    () => window.matchMedia(query).matches,
    () => false
  )
}
