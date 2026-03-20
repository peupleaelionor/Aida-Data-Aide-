import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { prisma } from '@aida/database'
import type { UpdateProfileDto } from './dto/update-profile.dto'

@Injectable()
export class UsersService {
  async findById(id: string) {
    return prisma.user.findUnique({ where: { id }, include: { profile: true } })
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  }

  async create(data: { name: string; email: string; password: string }) {
    const existing = await this.findByEmail(data.email)
    if (existing) throw new ConflictException('Email already in use')
    return prisma.user.create({ data })
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    return prisma.profile.upsert({
      where: { userId },
      create: { userId, ...dto },
      update: dto,
    })
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit
    const [data, total] = await Promise.all([
      prisma.user.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.user.count(),
    ])
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  async delete(id: string) {
    const user = await this.findById(id)
    if (!user) throw new NotFoundException('User not found')
    await prisma.user.delete({ where: { id } })
  }
}
