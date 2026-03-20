'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const schema = z.object({
  householdSize: z.coerce.number().min(1).max(20),
  monthlyIncome: z.coerce.number().min(0),
  country: z.string().min(2),
})

type FormData = z.infer<typeof schema>

interface ProfileFormProps {
  defaultValues?: Partial<FormData>
  onSave?: (data: FormData) => void
}

export function ProfileForm({ defaultValues, onSave }: ProfileFormProps) {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await fetch('/api/backend/users/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      toast.success('Profile saved!')
      onSave?.(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Household size</label>
        <input {...register('householdSize')} type="number" min={1}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
        {errors.householdSize && <p className="mt-1 text-xs text-red-500">{errors.householdSize.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Monthly income (USD)</label>
        <input {...register('monthlyIncome')} type="number" min={0}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
        <select {...register('country')}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500">
          <option value="US">United States</option>
          <option value="GB">United Kingdom</option>
          <option value="CA">Canada</option>
        </select>
      </div>
      <button type="submit" disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Save profile
      </button>
    </form>
  )
}
