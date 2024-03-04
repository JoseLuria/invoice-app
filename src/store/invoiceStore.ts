import type { Invoice, InvoiceStatus } from '@/schemas'
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { INITIAL_INVOICES } from '@/contants'

type InvoiceStore = {
  invoices: Invoice[]
  statusToFilter: InvoiceStatus[]
  setStatus: (status: InvoiceStatus[]) => void
  setInvoices: (invoices: Invoice[]) => void
  getInvoices: () => Invoice[]
}

export const invoiceStore = create<InvoiceStore>()(
  devtools(
    persist(
      (set, get) => ({
        invoices: [...INITIAL_INVOICES],
        statusToFilter: [],
        setStatus: (status) => {
          set((state) => ({ ...state, statusToFilter: [...status] }))
        },
        setInvoices: (invoices) => {
          set(() => ({ invoices: [...invoices] }))
        },
        getInvoices: () => {
          const { invoices, statusToFilter: status } = get()
          if (status.length > 0) {
            return invoices.filter((invoice) => status.includes(invoice.status))
          }
          return invoices
        }
      }),
      { name: 'invoiceStore' }
    )
  )
)

export const useInvoiceStore = () => invoiceStore((state) => state)
