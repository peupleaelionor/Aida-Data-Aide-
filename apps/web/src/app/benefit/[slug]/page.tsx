import type { Metadata } from 'next'
import Script from 'next/script'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const title = params.slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  return {
    title,
    description: `Learn about eligibility, how to apply, and benefit amounts for ${title}.`,
    alternates: { canonical: '/benefit/' + params.slug },
  }
}

export default function BenefitSEOPage({ params }: { params: { slug: string } }) {
  const title = params.slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: title,
    provider: { '@type': 'GovernmentOrganization', name: 'Government Benefits Authority' },
    description: `Details about ${title} government benefit program.`,
    url: process.env.NEXT_PUBLIC_APP_URL + '/benefit/' + params.slug,
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-500 leading-relaxed">
          Detailed information about eligibility criteria, benefit amounts, how to apply, and important deadlines for the {title} program.
        </p>
      </div>
    </>
  )
}
