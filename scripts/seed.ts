import { prisma } from '../packages/database/src'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('Seeding...')

  await prisma.user.upsert({
    where: { email: 'admin@aida.gov' },
    update: {},
    create: {
      name: 'AIDA Admin',
      email: 'admin@aida.gov',
      password: await bcrypt.hash('admin123!', 12),
      role: 'admin',
    },
  })

  console.log('Done!')
  await prisma.$disconnect()
}

main().catch(console.error)
