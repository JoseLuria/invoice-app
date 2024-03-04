import { ALPHABET, NUMBERS } from '@/contants'

export const generateId = () => {
  return Array.from({ length: 6 })
    .map((_, i) => {
      const character = i < 2 ? ALPHABET : NUMBERS
      return character[Math.floor(Math.random() * character.length)]
    })
    .join('')
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export const transformDate = (date: string | Date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toISOString().split('T')[0]
}

export const calculatePaymentDue = (date: string, terms: number) => {
  const dueDate = new Date(date)
  dueDate.setDate(dueDate.getDate() + terms)
  return transformDate(dueDate)
}
