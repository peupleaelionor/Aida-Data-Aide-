'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Loader2, User, Home, Briefcase } from 'lucide-react'

const profileSchema = z.object({
  householdSize: z.coerce.number().min(1).max(20),
  monthlyIncome: z.coerce.number().min(0),
  employmentStatus: z.enum(['employed', 'self_employed', 'unemployed', 'retired', 'student', 'disabled']),
  country: z.string().min(2),
  state: z.string().optional(),
  city: z.string().optional(),
  hasDisability: z.boolean(),
  hasChildren: z.boolean(),
  isVeteran: z.boolean(),
})

type ProfileForm = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'household' | 'income' | 'location'>('household')

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      householdSize: 1,
      monthlyIncome: 0,
      employmentStatus: 'employed',
      country: 'US',
      hasDisability: false,
      hasChildren: false,
      isVeteran: false,
    },
  })

  const onSubmit = async (data: ProfileForm) => {
    setIsLoading(true)
    try {
      await fetch('/api/backend/users/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      toast.success('Profile updated! Re-running eligibility check...')
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { id: 'household', label: 'Household', icon: Home },
    { id: 'income', label: 'Income', icon: Briefcase },
    { id: 'location', label: 'Location', icon: User },
  ] as const

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">Keep your profile accurate to get the best benefit matches.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 flex-1 px-4 py-3.5 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {activeTab === 'household' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Household size</label>
                <input
                  {...register('householdSize')}
                  type="number"
                  min={1}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                {errors.householdSize && <p className="mt-1 text-xs text-red-500">{errors.householdSize.message}</p>}
              </div>
              <div className="space-y-3">
                {[
                  { name: 'hasChildren', label: 'I have dependent children' },
                  { name: 'hasDisability', label: 'I or a household member has a disability' },
                  { name: 'isVeteran', label: 'I am a military veteran' },
                ].map((item) => (
                  <label key={item.name} className="flex items-center gap-3 cursor-pointer">
                    <input
                      {...register(item.name as keyof ProfileForm)}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {activeTab === 'income' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Monthly household income (USD)</label>
                <input
                  {...register('monthlyIncome')}
                  type="number"
                  min={0}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Employment status</label>
                <select
                  {...register('employmentStatus')}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="employed">Employed full-time</option>
                  <option value="self_employed">Self-employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="retired">Retired</option>
                  <option value="student">Student</option>
                  <option value="disabled">Unable to work (disability)</option>
                </select>
              </div>
            </>
          )}

          {activeTab === 'location' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                <select
                  {...register('country')}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="DE">Germany</option>
                  <option value="AU">Australia</option>
                  <option value="FR">France</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">State / Province</label>
                <input
                  {...register('state')}
                  type="text"
                  placeholder="e.g. California"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                <input
                  {...register('city')}
                  type="text"
                  placeholder="e.g. Los Angeles"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Save profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
