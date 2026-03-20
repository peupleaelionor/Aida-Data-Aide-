import { Injectable, NotFoundException } from '@nestjs/common'
import { prisma } from '@aida/database'

@Injectable()
export class GdprService {
  async exportUserData(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true, applications: { include: { benefit: true } } },
    })
    if (!user) throw new NotFoundException('User not found')

    const { password: _pwd, ...safeUser } = user
    return {
      exportedAt: new Date().toISOString(),
      user: safeUser,
      dataCategories: ['profile', 'applications', 'account'],
    }
  }

  async deleteUserData(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new NotFoundException('User not found')

    await prisma.$transaction([
      prisma.application.deleteMany({ where: { userId } }),
      prisma.profile.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ])

    return { deleted: true, userId, deletedAt: new Date().toISOString() }
  }

  async recordConsent(userId: string, consentType: string, granted: boolean) {
    return { userId, consentType, granted, recordedAt: new Date().toISOString() }
  }
}
