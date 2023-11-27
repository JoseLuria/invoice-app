'use client'
import { type ReactNode, type FC, useEffect, useState } from 'react'

interface Props {
  children: ReactNode
}

export const AppWrapper: FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setMounted(true)
  }, [])

  if (!mounted) return <body />

  return <>{children}</>
}
