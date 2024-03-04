import { z } from 'zod'
import { ERRORS } from '@/contants'

const nonEmptyString = z.string().min(1, ERRORS.EMPTY)
const positiveNumber = z
  .number({
    invalid_type_error: ERRORS.EMPTY
  })
  .positive(ERRORS.POSITIVE)

const addressSchema = z.object({
  street: nonEmptyString,
  city: nonEmptyString,
  postCode: nonEmptyString,
  country: nonEmptyString
})

const itemSchema = z.object({
  name: nonEmptyString,
  quantity: positiveNumber,
  price: positiveNumber
})

const invoiceStatusSchema = z.enum(['paid', 'pending'])

export const invoiceSchema = z.object({
  id: nonEmptyString,
  createdAt: nonEmptyString,
  paymentDue: z.string(),
  description: nonEmptyString,
  paymentTerms: positiveNumber.min(1, ERRORS.NON_ZERO),
  clientName: nonEmptyString,
  clientEmail: z.string().email(ERRORS.EMAIL),
  status: invoiceStatusSchema.default('pending'),
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: z.array(itemSchema),
  total: z.number()
})

export type InvoiceStatus = z.infer<typeof invoiceStatusSchema>
export type Invoice = z.infer<typeof invoiceSchema>
