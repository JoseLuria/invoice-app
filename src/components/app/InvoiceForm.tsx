'use client'
import { type FC, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Invoice, invoiceSchema } from '@/schemas'
import { Button, Back, Input } from '../shared'
import { Delete } from '../svg'
import { generateId } from '@/utils'

interface Props {
  invoice?: Invoice
}

export const InvoiceForm: FC<Props> = ({ invoice }) => {
  const { handleSubmit, register, control, formState, setValue } = useForm<Invoice>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: invoice ?? {
      id: generateId(),
      createdAt: new Date().toISOString().split('T')[0],
      items: [{ name: '', quantity: 0, price: 0 }],
      total: 0
    }
  })
  const [items] = useWatch({ control, name: ['items'] })
  const router = useRouter()

  const close = () => router.back()

  const hasSomeError = Object.keys(formState.errors).length > 0

  const onSubmit = (data: Invoice) => {
    console.log(data)
  }

  useEffect(() => {
    document.body.classList.add('overflow-y-hidden')

    return () => {
      document.body.classList.remove('overflow-y-hidden')
    }
  }, [])

  return (
    <aside
      onClick={close}
      id='form-overlay'
      className='w-full h-full fixed top-0 left-0 animate-fade-in bg-[#000]/40 pt-[72px] md:pt-20 lg:pt-0'
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full h-full relative flex bg-white animate-open-right overflow-hidden dark:bg-very-dark-blue md:w-[616px] md:rounded-r-[20px] lg:w-[719px]'
        onClick={(e) => e.stopPropagation()}
      >
        <main className='grow overflow-y-auto scrollbar-hide flex flex-col gap-6 pt-8 pb-32 px-6 md:p-14 md:pb-36 lg:pt-14 lg:pl-[159px]'>
          <Back className='md:hidden' />

          <h2 className='text-sm font-bold text-purple'>Bill From</h2>

          <Input
            id='senderAddress.street'
            label='Street Address'
            {...register('senderAddress.street')}
            error={formState.errors.senderAddress?.street?.message}
            full
          />

          <div className='grid grid-cols-2 gap-6 md:grid-cols-3'>
            <Input
              id='senderAddress.city'
              label='City'
              {...register('senderAddress.city')}
              error={formState.errors.senderAddress?.city?.message}
              full
              classNameError='hidden'
            />

            <Input
              id='senderAddress.postCode'
              label='Post Code'
              {...register('senderAddress.postCode')}
              error={formState.errors.senderAddress?.postCode?.message}
              full
              classNameError='hidden'
            />

            <Input
              className='col-span-2 md:col-span-1'
              id='senderAddress.country'
              label='Country'
              {...register('senderAddress.country')}
              error={formState.errors.senderAddress?.country?.message}
              full
              classNameError='md:hidden'
            />
          </div>

          <h2 className='text-sm font-bold text-purple'>Bill To</h2>

          <Input
            id='clientName'
            label="Client's name"
            {...register('clientName')}
            error={formState.errors.clientName?.message}
            full
          />

          <Input
            id='clientEmail'
            label="Client's email"
            {...register('clientEmail')}
            error={formState.errors.clientEmail?.message}
            full
          />

          <Input
            id='clientAddress.street'
            label='Street Address'
            {...register('clientAddress.street')}
            error={formState.errors.clientAddress?.street?.message}
            full
          />

          <div className='grid grid-cols-2 gap-6 md:grid-cols-3'>
            <Input
              id='clientAddress.city'
              label='City'
              {...register('clientAddress.city')}
              error={formState.errors.clientAddress?.city?.message}
              full
              classNameError='hidden'
            />

            <Input
              id='clientAddress.postCode'
              label='Post Code'
              {...register('clientAddress.postCode')}
              error={formState.errors.clientAddress?.postCode?.message}
              full
              classNameError='hidden'
            />

            <Input
              className='col-span-2 md:col-span-1'
              id='clientAddress.country'
              label='Country'
              {...register('clientAddress.country')}
              error={formState.errors.clientAddress?.country?.message}
              full
              classNameError='md:hidden'
            />
          </div>

          <div className='grid gap-6 md:grid-cols-2'>
            <Input
              id='createdAt'
              label='Invoice Date'
              type='date'
              {...register('createdAt')}
              error={formState.errors.createdAt?.message}
              full
            />

            <Input
              id='paymentDue'
              label='Payment Terms'
              {...register('paymentDue')}
              error={formState.errors.paymentDue?.message}
              full
            />
          </div>

          <Input
            id='description'
            label='Project Description'
            {...register('description')}
            error={formState.errors.description?.message}
            full
          />

          <h2 className='font-bold text-lg text-[#777F98]'>Item List</h2>

          <section>
            {items.length > 0 && (
              <>
                <div className='hidden md:grid grid-cols-4 gap-4 mb-4'>
                  <span className='font-medium text-sm text-left hidden text-[#7E88C3] dark:text-light-gray md:block'>
                    Item Name
                  </span>
                  <span className='font-medium text-sm text-left text-[#7E88C3] dark:text-light-gray'>
                    Qty.
                  </span>
                  <span className='font-medium text-sm text-left text-[#7E88C3] dark:text-light-gray'>
                    Price
                  </span>
                  <span className='font-medium text-sm text-left text-[#7E88C3] dark:text-light-gray'>
                    Total
                  </span>
                </div>

                {items.map((item, i) => {
                  const total = item.quantity * item.price

                  return (
                    <div className='grid gap-4 mb-[18px] grid-cols-3 md:grid-cols-4' key={i}>
                      <Input
                        label='Item Name'
                        id={`items.${i}.name`}
                        error={formState.errors.items?.[i]?.name?.message}
                        classNameLabel='md:hidden'
                        {...register(`items.${i}.name`)}
                        className='col-span-3 md:col-span-1'
                        classNameError='md:hidden'
                        full
                      />
                      <Input
                        label='Qty.'
                        id={`items.${i}.quantity`}
                        error={formState.errors.items?.[i]?.quantity?.message}
                        classNameLabel='md:hidden'
                        classNameError='hidden'
                        {...register(`items.${i}.quantity`, { valueAsNumber: true })}
                        type='number'
                        full
                      />
                      <Input
                        label='Price'
                        id={`items.${i}.price`}
                        error={formState.errors.items?.[i]?.price?.message}
                        classNameLabel='md:hidden'
                        classNameError='hidden'
                        {...register(`items.${i}.price`, { valueAsNumber: true })}
                        type='number'
                        full
                      />
                      <div className='flex gap-4 justify-between'>
                        <Input
                          label='Total'
                          id={`items.${i}.total`}
                          classNameLabel='md:hidden'
                          classNameError='hidden'
                          value={isNaN(total) ? 0 : total}
                          full
                          readOnly
                        />
                        {items.length > 1 && (
                          <button
                            onClick={() => {
                              const newItems = [...items]
                              newItems.splice(i, 1)
                              setValue('items', newItems)
                            }}
                            type='button'
                          >
                            <Delete />
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </>
            )}

            <Button
              type='button'
              full
              onClick={() => setValue('items', [...items, { name: '', quantity: 0, price: 0 }])}
            >
              + Add New Item
            </Button>
          </section>

          {hasSomeError && <div className='text-red text-sm'>- All fields must be added</div>}
        </main>

        <section className='absolute bottom-0 left-0 w-full shadow-[0px_-20px_25px_0px_rgba(0,_0,_0,_0.10)] bg-white dark:bg-very-dark-blue flex gap-1 overflow-y-auto px-6 py-[21px] md:gap-2 md:px-14 md:py-8 md:rounded-r-[20px] lg:pl-[160px]'>
          <Button
            type='button'
            onClick={close}
            className={clsx('ml-auto', !invoice && 'md:ml-0 md:mr-auto')}
            variant='white'
          >
            {invoice ? 'Cancel' : 'Discard'}
          </Button>
          {!invoice && (
            <Button type='button' variant='dark'>
              Save as draft
            </Button>
          )}
          <Button type='submit' variant='purple'>
            {invoice ? 'Save Changes' : 'Save & Send'}
          </Button>
        </section>
      </form>
    </aside>
  )
}
