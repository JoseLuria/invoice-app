'use client'
import { useSearchParams } from 'next/navigation'

export const useFormId = () => {
  const searchParams = useSearchParams()

  const formId = searchParams.get('formId') ?? ''

  return { formId }
}
