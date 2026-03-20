import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FileText, ExternalLink } from 'lucide-react'

const mockApplications = [
  {
    id: '1',
    benefit: 'Supplemental Nutrition Assistance Program (SNAP)',
    status: 'approved',
    submittedAt: '2024-05-10',
    updatedAt: '2024-05-15',
    amount: '$250/month',
    nextStep: 'Renewal due Jan 2025',
  },
  {
    id: '2',
    benefit: 'Medicaid Health Coverage',
    status: 'pending',
    submittedAt: '2024-05-08',
    updatedAt: '2024-05-08',
    amount: 'Full coverage',
    nextStep: 'Awaiting income verification',
  },
  {
    id: '3',
    benefit: 'Housing Choice Voucher (Section 8)',
    status: 'review',
    submittedAt: '2024-05-01',
    updatedAt: '2024-05-12',
    amount: 'Up to $800/month',
    nextStep: 'Interview scheduled May 30',
  },
]

const statusConfig: Record<string, { label: string; cls: string }> = {
  approved: { label: 'Approved', cls: 'bg-green-100 text-green-700' },
  pending: { label: 'Pending', cls: 'bg-yellow-100 text-yellow-700' },
  review: { label: 'Under Review', cls: 'bg-blue-100 text-blue-700' },
  rejected: { label: 'Rejected', cls: 'bg-red-100 text-red-700' },
}

export default async function ApplicationsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-500 mt-1">Track the status of all your benefit applications.</p>
      </div>

      <div className="space-y-4">
        {mockApplications.map((app) => {
          const sc = statusConfig[app.status] ?? statusConfig['pending']!
          return (
            <div key={app.id} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 flex-shrink-0 mt-0.5">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{app.benefit}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-500">
                      <span>Submitted {app.submittedAt}</span>
                      <span>·</span>
                      <span className="font-medium text-gray-700">{app.amount}</span>
                    </div>
                    <p className="mt-2 text-sm text-blue-600 font-medium">{app.nextStep}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${sc.cls}`}>{sc.label}</span>
                  <Link href={'/benefits/' + app.id} className="text-gray-400 hover:text-blue-600 transition-colors">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {mockApplications.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium">No applications yet</p>
          <Link href="/benefits/us" className="mt-4 inline-block text-blue-600 hover:underline">Browse benefits</Link>
        </div>
      )}
    </div>
  )
}
