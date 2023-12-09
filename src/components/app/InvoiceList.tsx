'use client'
import Link from 'next/link'
import clsx from 'clsx'
import { IllustrationEmpty, ArrowRight } from '../svg'
import { useInvoiceStore } from '@/store'
import { formatDate, formatCurrency } from '@/utils'

const BTN_STATUS = {
  paid: 'bg-[#33D69F] text-[#33D69F] bg-opacity-[0.05]',
  pending: 'bg-[#FF8F00] text-[#FF8F00] bg-opacity-[0.05]',
  draft:
    'bg-[#373B53] text-[#373B53] bg-opacity-[0.05] dark:bg-opacity-[0.05] dark:bg-light-gray dark:text-light-gray'
}

const BTN_ICON = {
  paid: 'bg-[#33D69F]',
  pending: 'bg-[#FF8F00]',
  draft: 'bg-[#373B53] dark:bg-light-gray'
}

export const InvoiceList = () => {
  const { invoices, hasFilters, filteredInvoices } = useInvoiceStore()

  const invoiceList = hasFilters ? filteredInvoices : invoices

  if (invoiceList.length === 0) {
    return (
      <section className='m-auto flex flex-col items-center text-center'>
        <IllustrationEmpty />

        <h2 className='font-semibold text-xl mt-10 mb-6'>There is nothing here</h2>

        <p className='duration-200 text-gray dark:text-light-gray'>
          Create an invoice by clicking <br />
          the <strong>New</strong> button and get started
        </p>
      </section>
    )
  }

  return (
    <ul className='mt-8 flex flex-col gap-4 font-bold md:mt-14 lg:mt-16'>
      {invoiceList.map((invoice) => (
        <li key={invoice.id} className='flex'>
          <Link
            className='bg-white w-full rounded-lg text-sm border-[1px] grid grid-cols-2 p-6 border-white shadow-[0px_10px_10px_-10px_rgba(72,_84,_159,_0.10)] md:hover:border-purple focus-visible:border-purple dark:border-dark-grayish-blue dark:bg-dark-grayish-blue dark:shadow-[0px_10px_10px_-10px_rgba(72,_84,_159,_0.10)] md:dark:hover:border-purple dark:focus-visible:border-purple md:[grid-template-columns:auto_max-content_auto] md:place-items-center md:grid-flow-col md:place-content-between'
            href={`/invoice/${invoice.id}`}
          >
            <p>
              <span className='text-[#7E88C3]'>#</span>
              {invoice.id}
            </p>
            <p className='font-medium line-clamp-1 text-right text-[#858BB2] dark:text-white md:w-[110px] md:col-start-3 md:text-center'>
              {invoice.clientName}
            </p>
            <p className='font-medium line-clamp-1 mb-2 mt-6 text-gray dark:text-light-gray md:m-0 md:w-[150px] md:col-start-2 md:text-center'>
              {formatDate(new Date(invoice.createdAt))}
            </p>
            <div className='flex row-span-2 mt-6 md:mt-0 md:row-span-1 md:col-start-5 md:items-center md:gap-5'>
              <span
                className={clsx(
                  'p-3 w-[104px] flex items-center my-auto ml-auto justify-center gap-2 rounded-md md:m-0',
                  BTN_STATUS[invoice.status]
                )}
              >
                <span className={clsx('w-2 h-2 rounded-full', BTN_ICON[invoice.status])} />
                {invoice.status}
              </span>

              <ArrowRight className='hidden md:block' />
            </div>
            <p className='text-base line-clamp-1 md:col-start-4'>{formatCurrency(invoice.total)}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
