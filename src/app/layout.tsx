import './globals.css'
import type { FC, ReactNode } from 'react'
import type { Metadata } from 'next'

const title = 'Invoice App'
const description = 'A simple invoice app created with Next.js and TypeScript.'

export const metadata: Metadata = {
  title,
  description,
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/meta/apple-touch-icon.png',
      sizes: '180x180'
    },
    {
      rel: 'icon',
      url: '/meta/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png'
    },
    {
      rel: 'icon',
      url: '/meta/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png'
    },
    {
      rel: 'shortcut icon',
      url: '/meta/favicon.ico'
    }
  ],
  manifest: '/meta/site.webmanifest',
  metadataBase: new URL('http://localhost:3000/'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    title,
    description,
    images: [
      {
        url: '/meta/otg.webp',
        width: 1440,
        height: 1056,
        alt: title
      }
    ]
  }
}

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang='es'>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
