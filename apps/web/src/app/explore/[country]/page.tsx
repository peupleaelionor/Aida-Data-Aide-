import type { Metadata } from 'next'
import Link from 'next/link'

const countryData: Record<string, { name: string; cities: string[] }> = {
  us: { name: 'United States', cities: ['new-york', 'los-angeles', 'chicago', 'houston', 'phoenix'] },
  gb: { name: 'United Kingdom', cities: ['london', 'manchester', 'birmingham', 'leeds'] },
  ca: { name: 'Canada', cities: ['toronto', 'vancouver', 'montreal', 'calgary'] },
  de: { name: 'Germany', cities: ['berlin', 'munich', 'hamburg', 'frankfurt'] },
  au: { name: 'Australia', cities: ['sydney', 'melbourne', 'brisbane', 'perth'] },
}

export async function generateStaticParams() {
  return Object.keys(countryData).map((country) => ({ country }))
}

export async function generateMetadata({ params }: { params: { country: string } }): Promise<Metadata> {
  const data = countryData[params.country]
  const name = data?.name ?? params.country.toUpperCase()
  return {
    title: `${name} Government Benefits`,
    description: `Browse all government benefit programs available in ${name}. Find financial aid, healthcare, housing, food assistance and more.`,
  }
}

export default function CountryBenefitsPage({ params }: { params: { country: string } }) {
  const data = countryData[params.country]
  const name = data?.name ?? params.country.toUpperCase()
  const cities = data?.cities ?? []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        {' / '}
        <span className="text-gray-900">{name}</span>
      </nav>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Government Benefits in {name}</h1>
      <p className="text-gray-500 mb-8">
        Discover all federal and state/provincial benefit programs available to residents of {name}.
      </p>

      {cities.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Browse by city</h2>
          <div className="flex flex-wrap gap-3">
            {cities.map((city) => (
              <Link
                key={city}
                href={'/explore/' + params.country + '/' + city}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 capitalize transition-colors"
              >
                {city.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {['Food Assistance', 'Healthcare', 'Housing', 'Childcare', 'Disability', 'Unemployment'].map((cat) => (
          <div key={cat} className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-1">{cat} Benefits</h3>
            <p className="text-sm text-gray-500">View all {cat.toLowerCase()} benefit programs in {name}.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
