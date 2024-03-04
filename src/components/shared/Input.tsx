import { type InputHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  full?: boolean
  error?: string
  classNameLabel?: string
  classNameInput?: string
  classNameError?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    { id, label, className, full, error, classNameLabel, classNameError, classNameInput, ...props },
    ref
  ) => {
    const isFull = full ? 'w-full' : 'w-fit'

    const inputProps = {
      ref,
      className: clsx(
        'text-sm border-[1px] duration-200 block px-5 py-2.5 rounded bg-white dark:bg-dark-grayish-blue dark:text-white',
        isFull,
        error ? 'border-red' : 'border-light-gray dark:border-[#252945]',
        classNameInput
      ),
      ...props
    }

    return (
      <fieldset className={clsx('font-medium', isFull, className)}>
        <label
          className={clsx(
            'text-sm flex justify-between gap-1 mb-[10px] duration-200',
            error ? 'text-red' : 'text-[#7E88C3] dark:text-light-gray',
            classNameLabel
          )}
        >
          {label}

          {error && <span className={clsx('text-red', classNameError)}>{error}</span>}
        </label>
        <input {...inputProps} />
      </fieldset>
    )
  }
)
