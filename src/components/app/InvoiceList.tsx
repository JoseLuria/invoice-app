'use client'
import Link from 'next/link'
import { ArrowRight } from '../svg'
import { StatusLabel, Empty } from '../shared'
import { useInvoiceStore } from '@/store'
import { formatDate, formatCurrency } from '@/utils'

export const InvoiceList = () => {
  const { invoices, hasFilters, filteredInvoices } = useInvoiceStore()

  const invoiceList = hasFilters ? filteredInvoices : invoices

  if (invoiceList.length === 0) {
    return (
      <Empty>
        Create an invoice by clicking <br />
        the <strong>New</strong> button and get started
      </Empty>
    )
  }

  return (
    <ul className='mt-8 flex flex-col gap-4 font-bold md:mt-14 lg:mt-16'>
      {invoiceList.map((invoice) => (
        <li key={invoice.id} className='flex'>
          <Link
            className='bg-white w-full rounded-lg text-sm border-[1px] grid grid-cols-2 p-6 border-white shadow-card md:hover:border-purple focus-visible:border-purple dark:border-dark-grayish-blue dark:bg-dark-grayish-blue md:dark:hover:border-purple dark:focus-visible:border-purple md:[grid-template-columns:auto_max-content_auto] md:place-items-center md:grid-flow-col md:place-content-between'
            href={`/invoice/${invoice.id}`}
          >
            <p>
              <span className='text-[#7E88C3]'>#</span>
              {invoice.id}
            </p>
            <p className='font-medium line-clamp-1 text-right text-grayish dark:text-white md:w-[110px] md:col-start-3 md:text-center'>
              {invoice.clientName}
            </p>
            <p className='font-medium line-clamp-1 mb-2 mt-6 text-gray dark:text-light-gray md:m-0 md:w-[150px] md:col-start-2 md:text-center'>
              {formatDate(new Date(invoice.createdAt))}
            </p>
            <div className='flex row-span-2 mt-6 md:mt-0 md:row-span-1 md:col-start-5 md:items-center md:gap-5'>
              <StatusLabel className='my-auto ml-auto md:m-0' status={invoice.status} />

              <ArrowRight className='hidden md:block' />
            </div>
            <p className='text-base line-clamp-1 md:col-start-4'>{formatCurrency(invoice.total)}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
