import Link from 'next/link'
import { CheckCircle, Clock } from 'lucide-react'

interface BenefitCardProps {
  id: string
  name: string
  description: string
  category: string
  amount: string
  country: string
  eligible: boolean
  matchScore?: number
}

export function BenefitCard({ id, name, description, category, amount, country, eligible, matchScore }: BenefitCardProps) {
  return (
    <Link
      href={'/benefits/' + id}
      className="flex flex-col bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500 mb-2">{category}</span>
          <h3 className="font-bold text-gray-900 leading-snug">{name}</h3>
        </div>
        {eligible ? (
          <span className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 flex-shrink-0 ml-3">
            <CheckCircle className="h-3.5 w-3.5" /> Eligible
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500 flex-shrink-0 ml-3">
            <Clock className="h-3.5 w-3.5" /> Check
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 flex-1 leading-relaxed">{description}</p>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
        <span className="text-sm font-bold text-gray-900">{amount}</span>
        <span className="text-xs text-gray-400">{country}</span>
      </div>
      {matchScore !== undefined && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>Match score</span>
            <span className="font-semibold text-gray-700">{matchScore}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: matchScore + '%' }} />
          </div>
        </div>
      )}
    </Link>
  )
}
