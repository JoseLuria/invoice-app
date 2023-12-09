import type { Invoice, InvoiceStatus } from '@/schemas'
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { INITIAL_INVOICES } from '@/contants'

type InvoiceStore = {
  invoices: Invoice[]
  filteredInvoices: Invoice[]
  status: InvoiceStatus[]
  hasFilters: boolean
  setStatus: (status: InvoiceStatus[]) => void
  setInvoices: (invoices: Invoice[]) => void
}

export const invoiceStore = create<InvoiceStore>()(
  devtools(
    persist(
      (set) => ({
        invoices: [...INITIAL_INVOICES],
        filteredInvoices: [],
        hasFilters: false,
        status: [],
        setStatus: (status) => {
          set((state) => {
            const hasFilters = status.length > 0
            const filteredInvoices = state.invoices.filter((invoice) =>
              status.includes(invoice.status)
            )
            return { ...state, status: [...status], hasFilters, filteredInvoices }
          })
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
