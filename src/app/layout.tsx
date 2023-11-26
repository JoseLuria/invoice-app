import './globals.css'
import type { Metadata } from 'next'
import { type FC, ReactNode } from 'react'
import { League_Spartan as Spartan } from 'next/font/google'
import clsx from 'clsx'
import { AppWrapper, AppBar } from '@/components'

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
    locale: 'en_US',
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

const spartan = Spartan({ subsets: ['latin'] })

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppWrapper>
      <html lang='en'>
        <body
          className={clsx(
            'w-full h-full absolute flex flex-col font-medium top-0 left-0 overflow-y-auto duration-200 bg-grayish-white text-dark dark:text-white dark:bg-very-dark-blue lg:overflow-hidden lg:flex-row',
            spartan.className
          )}
        >
          <AppBar />
          <main className='flex-1 px-6 pt-8 pb-20 md:px-12 md:pt-14 lg:overflow-y-auto'>
            <div className='w-full mx-auto min-h-full max-w-[730px]'>{children}</div>
          </main>
        </body>
      </html>
    </AppWrapper>
  )
}

export default RootLayout
