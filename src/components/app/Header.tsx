'use client'
import { type FC, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { ArrowDown, Plus } from '../svg'
import { useInvoiceStore } from '@/store'
import { STATUS_VALUES } from '@/contants'
import { capitalize } from '@/utils'

interface Props {
  isMobile?: boolean
}

export const Header: FC<Props> = ({ isMobile }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { getInvoices, setStatus, statusToFilter } = useInvoiceStore()

  const quantity = getInvoices().length
  const modalRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const getHeaderText = () => {
    if (quantity === 0) return 'No invoices'
    const isPlural = quantity > 1 ? 'invoices' : 'invoice'
    if (isMobile) return `${quantity} ${isPlural}`
    return `There are ${quantity} total ${isPlural}`
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!modalRef.current || !buttonRef.current) return
      if (
        !modalRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <section className='flex items-center'>
      <p className='font-semibold text-xl flex flex-col md:text-3xl'>
        Invoices
        <span className='text-sm font-medium duration-200 text-gray dark:text-light-gray'>
          {getHeaderText()}
        </span>
      </p>

      <div className='ml-auto relative'>
        <button
          ref={buttonRef}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className='flex items-center gap-3'
          title='Filter by status'
        >
          {isMobile ? 'Filter' : 'Filter by status'}{' '}
          <ArrowDown className={clsx('duration-200', isFilterOpen && 'rotate-180')} />
        </button>

        {isFilterOpen && (
          <div
            ref={modalRef}
            className='absolute p-6 w-48 bg-white rounded-lg top-full mt-6 left-1/2 -translate-x-1/2 shadow-[0px_10px_20px_0px_rgba(72,_84,_159,_0.25)] animate-fade-in dark:bg-dark-grayish-blue dark:shadow-[0px_10px_20px_0px_rgba(0,_0,_0,_0.25)]'
          >
            <ul className='flex flex-col gap-4'>
              {STATUS_VALUES.map((statusKey) => (
                <li key={statusKey} className='flex items-center gap-3 text-sm'>
                  <input
                    className={clsx(
                      'w-4 h-4 relative cursor-pointer after:border-[1px] after:rounded-sm after:absolute after:top-0 after:left-0 after:w-full after:h-full',
                      statusToFilter.includes(statusKey)
                        ? 'after:bg-purple after:flex after:justify-center after:items-center after:border-purple after:content-[url(/assets/icon-check.svg)]'
                        : 'after:bg-light-gray after:border-light-gray after:hover:border-purple dark:after:hover:border-purple dark:after:bg-very-dark-blue dark:after:border-very-dark-blue'
                    )}
                    onChange={({ target }) => {
                      if (target.checked) {
                        setStatus([...statusToFilter, statusKey])
                      } else {
                        setStatus(
                          statusToFilter.filter((checkedStatus) => checkedStatus !== statusKey)
                        )
                      }
                    }}
                    type='checkbox'
                    name={statusKey}
                    id={statusKey}
                    checked={statusToFilter.includes(statusKey)}
                  />
                  <label className='cursor-pointer' htmlFor={statusKey}>
                    {capitalize(statusKey)}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Link
        href='/?formId=new'
        className='bg-purple py-1.5 pl-1.5 pr-3.5 rounded-full flex items-center gap-2 text-white ml-[18px] duration-200 md:ml-10 hover:bg-light-purple focus-visible:bg-light-purple'
        title='Redirect to new invoice form'
      >
        <span className='bg-white p-2.5 rounded-full'>
          <Plus />
        </span>

        <span className='text-sm'>{isMobile ? 'New' : 'New Invoice'}</span>
      </Link>
    </section>
  )
}
