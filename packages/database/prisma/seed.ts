import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const benefits = [
  {
    slug: 'snap-food-assistance',
    name: 'Supplemental Nutrition Assistance Program (SNAP)',
    description: 'SNAP provides nutrition benefits to supplement the food budget of needy families so they can purchase healthy food and move towards self-sufficiency.',
    category: 'food' as const,
    country: 'US',
    amount: 'Up to $973/month (family of 4)',
    currency: 'USD',
    eligibilitySummary: 'Household income at or below 130% of poverty line. Must be US citizen or qualified non-citizen.',
    applicationUrl: 'https://www.fns.usda.gov/snap/apply',
    isActive: true,
  },
  {
    slug: 'medicaid',
    name: 'Medicaid',
    description: 'Medicaid is a joint federal and state program that helps with medical costs for some people with limited income and resources.',
    category: 'health' as const,
    country: 'US',
    amount: 'Full health coverage',
    currency: 'USD',
    eligibilitySummary: 'Low-income individuals, families with children, pregnant women, elderly, and people with disabilities.',
    applicationUrl: 'https://www.medicaid.gov/apply-for-coverage',
    isActive: true,
  },
  {
    slug: 'housing-choice-voucher',
    name: 'Housing Choice Voucher Program (Section 8)',
    description: 'The HCV program provides rental assistance to very low-income families, the elderly, and the disabled to afford decent, safe, and sanitary housing.',
    category: 'housing' as const,
    country: 'US',
    amount: 'Voucher covers rent above 30% of income',
    currency: 'USD',
    eligibilitySummary: 'Very low-income households (below 50% area median income). Priority given to extremely low-income families.',
    applicationUrl: 'https://www.hud.gov/topics/housing_choice_voucher_program_section_8',
    isActive: true,
  },
  {
    slug: 'child-tax-credit',
    name: 'Child Tax Credit',
    description: 'The Child Tax Credit helps families with qualifying children get a tax break.',
    category: 'tax' as const,
    country: 'US',
    amount: 'Up to $2,000 per qualifying child',
    currency: 'USD',
    eligibilitySummary: 'Families with children under 17. Income limits apply based on filing status.',
    applicationUrl: 'https://www.irs.gov/credits-deductions/individuals/child-tax-credit',
    isActive: true,
  },
  {
    slug: 'uk-universal-credit',
    name: 'Universal Credit',
    description: "Universal Credit is a payment to help with your living costs. It's paid monthly and you can usually get it if you're on a low income or out of work.",
    category: 'unemployment' as const,
    country: 'GB',
    amount: 'Up to £368.74/month (single 25+)',
    currency: 'GBP',
    eligibilitySummary: 'UK residents aged 18+, on low income or out of work. Household savings below £16,000.',
    applicationUrl: 'https://www.gov.uk/universal-credit/how-to-claim',
    isActive: true,
  },
]

async function main() {
  console.log('Seeding database...')

  const adminPassword = await bcrypt.hash('admin123!', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aida.gov' },
    update: {},
    create: {
      name: 'AIDA Admin',
      email: 'admin@aida.gov',
      password: adminPassword,
      role: 'admin',
      subscription: 'enterprise',
    },
  })
  console.log('Admin user:', admin.email)

  const testPassword = await bcrypt.hash('test1234!', 12)
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'test@example.com',
      password: testPassword,
      subscription: 'pro',
      profile: {
        create: {
          householdSize: 3,
          monthlyIncome: 2500,
          employmentStatus: 'employed',
          country: 'US',
          state: 'California',
          city: 'Los Angeles',
          hasChildren: true,
        },
      },
    },
  })
  console.log('Test user:', testUser.email)

  for (const benefit of benefits) {
    await prisma.benefit.upsert({
      where: { slug: benefit.slug },
      update: benefit,
      create: benefit,
    })
    console.log('Benefit seeded:', benefit.name)
  }

  console.log('Seeding complete!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
