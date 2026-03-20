import Link from 'next/link'
import { Search, Filter } from 'lucide-react'

const mockBenefits = [
  { id: '1', name: 'SNAP Food Assistance', category: 'Food', country: 'US', amount: 'Up to $250/mo', eligible: true },
  { id: '2', name: 'Medicaid', category: 'Health', country: 'US', amount: 'Full coverage', eligible: true },
  { id: '3', name: 'Section 8 Housing', category: 'Housing', country: 'US', amount: 'Up to $800/mo', eligible: false },
  { id: '4', name: 'Child Tax Credit', category: 'Tax', country: 'US', amount: '$2,000/yr', eligible: true },
  { id: '5', name: 'Social Security Disability', category: 'Disability', country: 'US', amount: 'Varies', eligible: false },
  { id: '6', name: 'WIC Nutrition Program', category: 'Food', country: 'US', amount: '$50/mo', eligible: true },
]

export default function BenefitsListPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Benefits Finder</h1>
        <p className="text-gray-500 mt-1">Browse all benefits matched to your profile.</p>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search benefits..."
            className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Filter className="h-4 w-4" /> Filter
        </button>
      </div>

      <div className="space-y-3">
        {mockBenefits.map((b) => (
          <Link
            key={b.id}
            href={'/benefits/' + b.id}
            className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{b.name}</h3>
                {b.eligible && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                    Eligible
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">{b.category}</span>
                <span>·</span>
                <span>{b.country}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-semibold text-gray-900">{b.amount}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
