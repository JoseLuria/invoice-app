'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Logo, Sun, Moon } from '../svg'
import { THEME } from '@/contants'

export const AppBar = () => {
  const toggleTheme = () => {
    const darkElements = document.querySelectorAll('[class*="dark:"]')

    darkElements.forEach((element) => element.classList.add('duration-200'))

    if (document.documentElement.classList.contains(THEME.DARK)) {
      localStorage.theme = THEME.LIGHT
      document.documentElement.classList.remove(THEME.DARK)
    } else {
      localStorage.theme = THEME.DARK
      document.documentElement.classList.add(THEME.DARK)
    }
  }

  return (
    <header className='w-full flex bg-grayish-blue dark:bg-dark-grayish-blue items-center lg:flex-col lg:rounded-r-[20px] lg:w-auto lg:h-full'>
      <Link
        className='relative w-[72px] h-[72px] bg-purple flex overflow-hidden rounded-r-[20px] md:w-20 md:h-20 lg:w-[103px] lg:h-[103px]'
        href='/'
      >
        <Logo className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 lg:scale-150' />
        <span className='h-[50%] w-full bg-light-purple mt-auto rounded-tl-[20px]' />
      </Link>

      <button
        onClick={toggleTheme}
        className='group ml-auto mr-6 md:mr-8 lg:mt-auto lg:mx-0 lg:mb-8'
      >
        <Sun className='dark:block hidden duration-200 group-hover:fill-light-gray group-focus-visible:fill-light-gray' />
        <Moon className='dark:hidden duration-200 group-hover:fill-light-gray group-focus-visible:fill-light-gray' />
      </button>

      <span className='w-px h-full bg-[#494E6E] lg:w-full lg:h-px' />

      <Image
        className='w-8 mx-6 rounded-full md:mx-8 lg:w-10 lg:mx-0 lg:my-6'
        src='/assets/image-avatar.webp'
        width={80}
        height={80}
        priority
        alt='Avatar'
      />
    </header>
  )
}
