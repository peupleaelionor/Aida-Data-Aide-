import type { EligibilityRule } from '../types'

export const usSNAPRules: EligibilityRule[] = [
  {
    id: 'snap-residency',
    benefitId: 'snap',
    type: 'residency',
    params: { countries: ['US'] },
    weight: 30,
  },
  {
    id: 'snap-income',
    benefitId: 'snap',
    type: 'income_limit',
    params: { fplMultiplier: 1.3 },
    weight: 40,
  },
  {
    id: 'snap-household',
    benefitId: 'snap',
    type: 'household_size',
    params: { min: 1, max: 20 },
    weight: 10,
  },
]
