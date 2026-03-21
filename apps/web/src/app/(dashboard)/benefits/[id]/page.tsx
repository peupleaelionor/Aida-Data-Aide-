import { ArrowLeft, CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function BenefitDetailPage({ params: _params }: { params: { id: string } }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/benefits" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to benefits
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="rounded bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">Food Assistance</span>
            <h1 className="text-2xl font-bold text-gray-900 mt-3">
              Supplemental Nutrition Assistance Program (SNAP)
            </h1>
            <p className="text-gray-500 mt-2">Federal food benefit program for low-income individuals and families.</p>
          </div>
          <span className="flex-shrink-0 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            Eligible
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { label: 'Benefit amount', value: 'Up to $250/month' },
            { label: 'Country', value: 'United States' },
            { label: 'Agency', value: 'USDA / FNS' },
            { label: 'Application time', value: '~30 minutes' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-gray-50 p-4">
              <div className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</div>
              <div className="font-semibold text-gray-900 mt-1">{item.value}</div>
            </div>
          ))}
        </div>

        <h2 className="font-bold text-gray-900 mb-3">Eligibility requirements</h2>
        <ul className="space-y-2 mb-8">
          {[
            { met: true, text: 'Household income below 130% of poverty line' },
            { met: true, text: 'US citizen or qualified non-citizen' },
            { met: true, text: 'Meet work requirements (or exemption)' },
            { met: false, text: 'Not already receiving SSI benefits in some states' },
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              {item.met
                ? <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                : <XCircle className="h-5 w-5 text-gray-300 flex-shrink-0" />}
              <span className={`text-sm ${item.met ? 'text-gray-700' : 'text-gray-400'}`}>{item.text}</span>
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <a
            href="https://www.fns.usda.gov/snap/apply"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
          >
            Apply now <ExternalLink className="h-4 w-4" />
          </a>
          <button className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Save for later
          </button>
        </div>
      </div>
    </div>
  )
}
