'use client'
import { type FC, ButtonHTMLAttributes } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { ArrowLeft } from '../svg'

export const Back: FC<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'>> = ({
  className,
  ...props
}) => {
  const router = useRouter()

  return (
    <button
      className={clsx(
        'flex items-center gap-6 text-sm duration-200 hover:text-[#7E88C3] focus-visible:text-[#7E88C3] dark:hover:text-gray dark:focus-visible:text-gray',
        className
      )}
      onClick={() => router.back()}
      {...props}
    >
      <ArrowLeft />
      Go Back
    </button>
  )
}
