'use client'
import type { Invoice } from '@/schemas'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Back, StatusLabel, Button } from '@/components'
import { useInvoiceStore } from '@/store'
import { useFormId } from '@/hooks'
import { formatDate, formatCurrency } from '@/utils'

const InvoiceForm = dynamic(() => import('@/components').then(({ InvoiceForm }) => InvoiceForm))
const Empty = dynamic(() => import('@/components').then(({ Empty }) => Empty))

const InvoiceById = () => {
  const { id } = useParams<{ id: string }>()
  const { invoices, setInvoices } = useInvoiceStore()
  const router = useRouter()
  const { formId } = useFormId()

  const invoice = invoices.find((invoice) => invoice.id === id)

  const deleteInvoice = () => {
    setInvoices(invoices.filter((invoice) => invoice.id !== id))
    router.push('/')
  }

  const markAsPaid = () => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === id ? { ...invoice, status: 'paid' } : invoice
    )

    setInvoices(updatedInvoices as Invoice[])
  }

  return (
    <>
      <Back />

      {invoice ? (
        <>
          <section className='p-6 flex items-center rounded-lg mt-8 mb-4 bg-white text-grayish shadow-card dark:bg-dark-grayish-blue dark:text-light-gray md:px-8'>
            <p className='text-sm'>status</p>

            <StatusLabel className='ml-auto md:mx-4' status={invoice.status} />

            <div className='fixed bottom-0 left-0 w-full flex items-center shadow-card-reverse overflow-x-auto px-6 gap-2 py-[22px] bg-white dark:bg-dark-grayish-blue md:relative md:shadow-transparent md:p-0 md:w-auto md:ml-auto md:overflow-hidden'>
              {invoice.status !== 'paid' && (
                <Button className='ml-auto md:ml-0' href={`/invoice/${id}?formId=${invoice.id}`}>
                  Edit
                </Button>
              )}
              <Button onClick={deleteInvoice} variant='red'>
                Delete
              </Button>
              {invoice.status === 'pending' && (
                <Button onClick={markAsPaid} variant='purple'>
                  Mark as paid
                </Button>
              )}
            </div>
          </section>

          <section className='mb-24 rounded-lg text-sm grid gap-8 bg-white text-grayish shadow-card dark:bg-dark-grayish-blue dark:text-light-gray md:mb-0 p-6 md:p-8 lg:p-12 md:grid-cols-3'>
            <h1>
              #<span className='font-bold text-dark dark:text-white'>{invoice.id}</span>
              <br />
              {invoice.description}
            </h1>

            <p className='md:text-right md:col-span-2'>
              {invoice.senderAddress.street}
              <br />
              {invoice.senderAddress.city}
              <br />
              {invoice.senderAddress.postCode}
              <br />
              {invoice.senderAddress.country}
            </p>

            <div className='grid grid-cols-2 gap-10 md:col-span-2'>
              <div className='flex flex-col justify-between gap-2 h-full'>
                <p className='flex flex-col'>
                  Invoice Date
                  <br />
                  <span className='mt-3 text-base font-bold text-dark dark:text-white'>
                    {formatDate(new Date(invoice.createdAt))}
                  </span>
                </p>

                <p className='flex flex-col'>
                  Payment Due
                  <br />
                  <span className='mt-3 text-base font-bold text-dark dark:text-white'>
                    {formatDate(new Date(invoice.paymentDue))}
                  </span>
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='flex flex-col'>
                  Bill To
                  <br />
                  <span className='mt-3 text-base font-bold text-dark dark:text-white'>
                    {invoice.clientName}
                  </span>
                </p>

                <p>
                  {invoice.clientAddress.street}
                  <br />
                  {invoice.clientAddress.city}
                  <br />
                  {invoice.clientAddress.postCode}
                  <br />
                  {invoice.clientAddress.country}
                </p>
              </div>
            </div>

            <p className='flex flex-col'>
              Sent to
              <br />
              <span className='mt-3 text-base font-bold text-dark dark:text-white'>
                {invoice.clientEmail}
              </span>
            </p>

            <div className='md:col-span-3 rounded-lg overflow-hidden'>
              <table className='p-6 bg-[#F9FAFE] flex flex-col gap-6 dark:bg-[#252945]'>
                <thead className='hidden text-sm text-left md:block'>
                  <tr className='flex gap-4 justify-between text-[#7E88C3] items-center dark:text-light-gray'>
                    <th className='flex-1 font-medium'>Item Name</th>
                    <th className='flex-1 font-medium text-right'>QTY.</th>
                    <th className='flex-1 font-medium text-right'>Price</th>
                    <th className='flex-1 font-medium text-right'>Total</th>
                  </tr>
                </thead>
                <tbody className='text-sm text-left text-dark dark:text-white'>
                  {invoice.items.map((item) => (
                    <tr
                      key={item.name}
                      className='flex gap-4 justify-between items-center font-bold'
                    >
                      <td className='flex flex-col gap-2 md:flex-1 md:block'>
                        {item.name}
                        <span className='text-[#7E88C3] md:hidden'>
                          {formatCurrency(item.price)} x {item.quantity}
                        </span>
                      </td>
                      <td className='text-right hidden flex-1 text-[#7E88C3] dark:text-light-gray md:block'>
                        {item.quantity}
                      </td>
                      <td className='text-right hidden flex-1 text-[#7E88C3] dark:text-light-gray md:block'>
                        {formatCurrency(item.price)}
                      </td>
                      <td className='text-right md:flex-1'>
                        {formatCurrency(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='px-6 py-8 bg-grayish-blue gap flex-wrap text-white flex items-center justify-between dark:bg-dark'>
                <p>Grand Total</p>
                <p className='text-xl font-bold'>{formatCurrency(invoice.total)}</p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <Empty>
          No invoice found with id <strong>{id}</strong>
        </Empty>
      )}

      {formId && <InvoiceForm invoice={invoice} />}
    </>
  )
}

export default InvoiceById
