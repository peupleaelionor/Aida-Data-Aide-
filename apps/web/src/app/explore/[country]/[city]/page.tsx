import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: { country: string; city: string } }): Promise<Metadata> {
  const cityName = params.city.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  return {
    title: `Benefits in ${cityName}`,
    description: `Find local and federal government benefits available to residents of ${cityName}.`,
  }
}

export default function CityBenefitsPage({ params }: { params: { country: string; city: string } }) {
  const cityName = params.city.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        {' / '}
        <Link href={'/explore/' + params.country} className="hover:text-blue-600 capitalize">{params.country}</Link>
        {' / '}
        <span className="text-gray-900">{cityName}</span>
      </nav>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Benefits in {cityName}</h1>
      <p className="text-gray-500 mb-8">
        Local government benefits, city programs, and federal assistance available to {cityName} residents.
      </p>
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
        <p className="text-blue-800 font-medium">
          Sign up free to get a personalized eligibility report for {cityName}.
        </p>
        <Link
          href="/register"
          className="mt-3 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
        >
          Check my eligibility
        </Link>
      </div>
    </div>
  )
}
