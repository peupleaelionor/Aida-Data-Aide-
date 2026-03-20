import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Users, FileText, TrendingUp, DollarSign } from 'lucide-react'

const adminStats = [
  { label: 'Total users', value: '52,841', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Benefits indexed', value: '247', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Monthly revenue', value: '$48,200', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Avg match rate', value: '73%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
]

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as { role?: string })?.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Platform overview and management.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {adminStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} mb-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <p className="text-yellow-800 font-medium">⚠️ This is a restricted admin area. All actions are logged and audited.</p>
      </div>
    </div>
  )
}
