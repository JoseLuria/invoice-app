import { z } from 'zod'
import { ERRORS } from '@/contants'

const nonEmptyString = z.string().min(1, ERRORS.EMPTY)
const positiveNumber = z.number().positive(ERRORS.POSITIVE)

const addressSchema = z.object({
  street: nonEmptyString,
  city: nonEmptyString,
  postCode: nonEmptyString,
  country: nonEmptyString
})

const itemSchema = z.object({
  name: nonEmptyString,
  quantity: positiveNumber,
  price: positiveNumber,
  total: positiveNumber
})

const invoiceStatusSchema = z.enum(['paid', 'pending', 'draft'])

export const invoiceSchema = z.object({
  id: nonEmptyString,
  createdAt: nonEmptyString,
  paymentDue: nonEmptyString,
  description: nonEmptyString,
  paymentTerms: positiveNumber,
  clientName: nonEmptyString,
  clientEmail: z.string().email(ERRORS.EMAIL),
  status: invoiceStatusSchema,
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: z.array(itemSchema),
  total: positiveNumber
})

export type InvoiceStatus = z.infer<typeof invoiceStatusSchema>
export type Invoice = z.infer<typeof invoiceSchema>
