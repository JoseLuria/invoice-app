import type { Invoice } from '@/schemas'
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { INITIAL_INVOICES } from '@/contants'

type InvoiceStore = {
  invoices: Invoice[]
  addInvoice: (invoice: Invoice) => void
  removeInvoice: (invoice: Invoice) => void
}

export const invoiceStore = create<InvoiceStore>()(
  devtools(
    persist(
      (set, store) => ({
        invoices: [...INITIAL_INVOICES],
        addInvoice: (invoice) => {
          set((state) => ({
            invoices: [...state.invoices, invoice]
          }))
        },
        removeInvoice: (invoice) => {
          set((state) => ({ invoices: state.invoices.filter((i) => i.id !== invoice.id) }))
        }
      }),
      { name: 'invoiceStore' }
    )
  )
)

export const useInvoiceStore = () => invoiceStore((state) => state)
