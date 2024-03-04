import type { FC, ReactNode } from 'react'
import { IllustrationEmpty } from '../svg'

interface Props {
  title?: string
  children?: ReactNode
}

export const Empty: FC<Props> = ({ title, children }) => {
  return (
    <section className='m-auto flex flex-col items-center text-center'>
      <IllustrationEmpty />

      <h2 className='font-semibold text-xl mt-10 mb-6'>{title || 'There is nothing here'}</h2>

      {children && (
        <p className='duration-200 text-gray whitespace-pre-line dark:text-light-gray'>
          {children}
        </p>
      )}
    </section>
  )
}
