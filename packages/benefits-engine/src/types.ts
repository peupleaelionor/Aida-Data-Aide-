export interface UserProfile {
  country: string
  householdSize: number
  monthlyIncome: number
  employmentStatus: 'employed' | 'self_employed' | 'unemployed' | 'retired' | 'student' | 'disabled'
  hasChildren: boolean
  hasDisability: boolean
  isVeteran: boolean
  age?: number
  state?: string
  city?: string
}

export interface EligibilityRule {
  id: string
  benefitId: string
  type: 'income_limit' | 'household_size' | 'employment' | 'residency' | 'age' | 'flag'
  params: Record<string, unknown>
  weight: number
}

export interface EligibilityResult {
  benefitId: string
  eligible: boolean
  score: number
  passedRules: string[]
  failedRules: string[]
  reasons: string[]
  missingCriteria: string[]
}
