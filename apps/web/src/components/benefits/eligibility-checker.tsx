'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, ChevronRight, Loader2 } from 'lucide-react'

const MOCK_ELIGIBILITY_RESULTS = [
  { benefitId: '1', benefitName: 'SNAP Food Assistance', eligible: true, score: 92, reasons: ['Income qualifies', 'Household size matches'] },
  { benefitId: '2', benefitName: 'Medicaid', eligible: true, score: 88, reasons: ['Income below threshold'] },
  { benefitId: '3', benefitName: 'Section 8 Housing', eligible: false, score: 45, reasons: ['Waitlist currently closed'] },
]

interface EligibilityResult {
  benefitId: string
  benefitName: string
  eligible: boolean
  score: number
  reasons: string[]
}

export function EligibilityChecker() {
  const [step, setStep] = useState(1)
  const [isChecking, setIsChecking] = useState(false)
  const [results, setResults] = useState<EligibilityResult[]>([])
  const [formData, setFormData] = useState({
    country: 'US',
    householdSize: 1,
    monthlyIncome: 0,
    hasChildren: false,
    hasDisability: false,
  })

  const handleCheck = async () => {
    setIsChecking(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setResults(MOCK_ELIGIBILITY_RESULTS)
    setIsChecking(false)
    setStep(3)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-lg">
      <h2 className="font-bold text-gray-900 text-lg mb-1">Quick Eligibility Check</h2>
      <p className="text-sm text-gray-500 mb-6">Answer a few questions to see what you qualify for.</p>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
            >
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="CA">Canada</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Household size</label>
            <input
              type="number"
              min={1}
              value={formData.householdSize}
              onChange={(e) => setFormData({ ...formData, householdSize: Number(e.target.value) })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
            />
          </div>
          <button
            onClick={() => setStep(2)}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Monthly household income (USD)</label>
            <input
              type="number"
              min={0}
              value={formData.monthlyIncome}
              onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
            />
          </div>
          <div className="space-y-3">
            {[
              { key: 'hasChildren', label: 'I have dependent children' },
              { key: 'hasDisability', label: 'I or family member has a disability' },
            ].map((item) => (
              <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData[item.key as keyof typeof formData] as boolean}
                  onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                  className="h-4 w-4 rounded text-blue-600"
                />
                <span className="text-sm text-gray-700">{item.label}</span>
              </label>
            ))}
          </div>
          <button
            onClick={handleCheck}
            disabled={isChecking}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60 transition-colors"
          >
            {isChecking ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isChecking ? 'Checking eligibility...' : 'Check my eligibility'}
          </button>
        </div>
      )}

      {step === 3 && results.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700 mb-4">Found {results.length} matching benefits:</p>
          {results.map((r) => (
            <div key={r.benefitId} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              {r.eligible
                ? <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                : <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{r.benefitName}</p>
                <p className="text-xs text-gray-500">{r.score}% match</p>
              </div>
            </div>
          ))}
          <button
            onClick={() => setStep(1)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mt-2"
          >
            Check again
          </button>
        </div>
      )}
    </div>
  )
}
