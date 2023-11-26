'use client'
import { type ReactNode, type FC, useEffect } from 'react'

interface Props {
  children: ReactNode
}

export const AppWrapper: FC<Props> = ({ children }) => {
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return <>{children}</>
}
