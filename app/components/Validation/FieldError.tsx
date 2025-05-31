'use client'

import { useCommonStore } from '@/app/store/commonStore'

interface FieldErrorProps {
  field: string
}

const FieldError = ({ field }: FieldErrorProps) => {
  const errors = useCommonStore((state) => state.validationErrors)

  const fieldErrors = errors.filter((err) =>
    err.toLowerCase().includes(field.toLowerCase())
  )

  if (fieldErrors.length === 0) return null

  return (
    <div className="text-red-500 text-sm -mt-5 mb-2">
      {fieldErrors.map((error, index) => (
        <div key={index}>{error}</div>
      ))}
    </div>
  )
}

export default FieldError
