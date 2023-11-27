import type { Invoice, InvoiceStatus } from '@/schemas'
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { INITIAL_INVOICES } from '@/contants'

type InvoiceStore = {
  invoices: Invoice[]
  status: InvoiceStatus[]
  setStatus: (status: InvoiceStatus[]) => void
  setInvoices: (invoices: Invoice[]) => void
}

export const invoiceStore = create<InvoiceStore>()(
  devtools(
    persist(
      (set) => ({
        invoices: [...INITIAL_INVOICES],
        status: [],
        setStatus: (status) => {
          set(() => ({ status: [...status] }))
        },
        setInvoices: (invoices) => {
          set(() => ({ invoices: [...invoices] }))
        }
      }),
      { name: 'invoiceStore' }
    )
  )
)

export const useInvoiceStore = () => invoiceStore((state) => state)
