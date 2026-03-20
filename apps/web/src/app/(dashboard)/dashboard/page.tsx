import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { CheckCircle, Clock, TrendingUp, AlertCircle } from 'lucide-react'

const mockStats = [
  { label: 'Benefits Found', value: '12', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Applications Active', value: '3', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { label: 'Approved', value: '7', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Needs Attention', value: '2', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
]

const mockApplications = [
  { id: '1', benefit: 'Supplemental Nutrition Assistance', status: 'approved', date: '2024-05-10', amount: '$250/mo' },
  { id: '2', benefit: 'Medicaid Health Coverage', status: 'pending', date: '2024-05-08', amount: 'Full coverage' },
  { id: '3', benefit: 'Housing Choice Voucher', status: 'review', date: '2024-05-01', amount: '$800/mo' },
  { id: '4', benefit: 'Child Tax Credit', status: 'approved', date: '2024-04-20', amount: '$2,000/yr' },
]

const statusStyles: Record<string, string> = {
  approved: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  review: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {session.user?.name?.split(' ')[0] ?? 'there'} 👋
        </h1>
        <p className="text-gray-500 mt-1">Here's your benefits overview for today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} mb-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Recent Applications</h2>
          <a href="/applications" className="text-sm font-medium text-blue-600 hover:underline">View all</a>
        </div>
        <div className="divide-y divide-gray-50">
          {mockApplications.map((app) => (
            <div key={app.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <div className="font-medium text-gray-900 text-sm">{app.benefit}</div>
                <div className="text-xs text-gray-400 mt-0.5">Applied {app.date}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-700">{app.amount}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[app.status]}`}>
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
