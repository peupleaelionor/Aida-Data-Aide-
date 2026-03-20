import { Injectable } from '@nestjs/common'
import { prisma } from '@aida/database'

@Injectable()
export class AnalyticsService {
  async getOverview() {
    const [totalUsers, totalBenefits, totalApplications] = await Promise.all([
      prisma.user.count(),
      prisma.benefit.count({ where: { isActive: true } }),
      prisma.application.count(),
    ])

    const approvedApplications = await prisma.application.count({ where: { status: 'approved' } })
    return {
      totalUsers,
      totalBenefits,
      totalApplications,
      approvedApplications,
      approvalRate: totalApplications > 0 ? Math.round((approvedApplications / totalApplications) * 1000) / 10 : 0,
    }
  }

  async getUserGrowth(days = 30) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    return prisma.user.groupBy({
      by: ['createdAt'],
      where: { createdAt: { gte: since } },
      _count: { id: true },
    })
  }

  async getTopBenefits(limit = 10) {
    return prisma.application.groupBy({
      by: ['benefitId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: limit,
    })
  }
}
