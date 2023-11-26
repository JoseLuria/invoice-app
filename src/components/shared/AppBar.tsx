'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Logo, Sun, Moon } from '../svg'

export const AppBar = () => {
  const toggleTheme = () => {
    if (localStorage.theme === 'dark') {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    } else {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    }
  }

  return (
    <header className='w-full flex duration-200 bg-grayish-blue dark:bg-dark-grayish-blue items-center lg:flex-col lg:rounded-r-[20px] lg:w-auto lg:h-full'>
      <Link
        className='relative w-[72px] h-[72px] bg-purple flex overflow-hidden rounded-r-[20px] md:w-20 md:h-20 lg:w-[103px] lg:h-[103px]'
        href='/'
      >
        <Logo className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 lg:scale-150' />
        <span className='h-[50%] w-full bg-ligh-purple mt-auto rounded-tl-[20px]' />
      </Link>

      <button onClick={toggleTheme} className='ml-auto mr-6 md:mr-8 lg:mt-auto lg:mx-0 lg:mb-8'>
        <Sun className='dark:block hidden' />
        <Moon className='dark:hidden' />
      </button>

      <span className='w-px h-full bg-[#494E6E] lg:w-full lg:h-px' />

      <Image
        className='w-8 mx-6 rounded-full md:mx-8 lg:w-10 lg:mx-0 lg:my-6'
        src='/assets/image-avatar.webp'
        width={80}
        height={80}
        alt='Avatar'
      />
    </header>
  )
}
