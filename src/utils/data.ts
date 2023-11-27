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
