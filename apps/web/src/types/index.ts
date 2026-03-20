export type UserRole = 'user' | 'admin' | 'moderator'

export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'enterprise'

export interface User {
  id: string
  name: string | null
  email: string
  image: string | null
  role: UserRole
  subscription: SubscriptionTier
  createdAt: Date
}

export interface Profile {
  id: string
  userId: string
  householdSize: number
  monthlyIncome: number
  employmentStatus: EmploymentStatus
  country: string
  state: string | null
  city: string | null
  hasDisability: boolean
  hasChildren: boolean
  isVeteran: boolean
  updatedAt: Date
}

export type EmploymentStatus =
  | 'employed'
  | 'self_employed'
  | 'unemployed'
  | 'retired'
  | 'student'
  | 'disabled'

export type BenefitCategory =
  | 'food'
  | 'health'
  | 'housing'
  | 'childcare'
  | 'disability'
  | 'unemployment'
  | 'education'
  | 'tax'
  | 'veterans'
  | 'other'

export interface Benefit {
  id: string
  slug: string
  name: string
  description: string
  category: BenefitCategory
  country: string
  state: string | null
  amount: string
  currency: string
  eligibilitySummary: string
  applicationUrl: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type ApplicationStatus = 'draft' | 'submitted' | 'pending' | 'review' | 'approved' | 'rejected'

export interface Application {
  id: string
  userId: string
  benefitId: string
  benefit: Benefit
  status: ApplicationStatus
  notes: string | null
  submittedAt: Date | null
  decidedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface EligibilityResult {
  benefitId: string
  benefit: Benefit
  eligible: boolean
  score: number
  reasons: string[]
  missingCriteria: string[]
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  createdAt?: Date
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}
