import { Injectable, NotFoundException } from '@nestjs/common'
import { prisma, type BenefitCategory } from '@aida/database'
import type { CreateBenefitDto } from './dto/create-benefit.dto'

@Injectable()
export class BenefitsService {
  async findAll(params: { country?: string; category?: string; page?: number; limit?: number }) {
    const { country, category, page = 1, limit = 20 } = params
    const skip = (page - 1) * limit
    const where = {
      isActive: true,
      ...(country && { country: country.toUpperCase() }),
      ...(category && { category: category as BenefitCategory }),
    }
    const [data, total] = await Promise.all([
      prisma.benefit.findMany({ where, skip, take: limit, orderBy: { name: 'asc' } }),
      prisma.benefit.count({ where }),
    ])
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  async findById(id: string) {
    const benefit = await prisma.benefit.findUnique({ where: { id } })
    if (!benefit) throw new NotFoundException('Benefit not found')
    return benefit
  }

  async findBySlug(slug: string) {
    const benefit = await prisma.benefit.findUnique({ where: { slug } })
    if (!benefit) throw new NotFoundException('Benefit not found')
    return benefit
  }

  async create(dto: CreateBenefitDto) {
    return prisma.benefit.create({ data: dto })
  }

  async update(id: string, dto: Partial<CreateBenefitDto>) {
    await this.findById(id)
    return prisma.benefit.update({ where: { id }, data: dto })
  }

  async delete(id: string) {
    await this.findById(id)
    return prisma.benefit.delete({ where: { id } })
  }
}
