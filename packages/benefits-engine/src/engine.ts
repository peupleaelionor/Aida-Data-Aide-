import type { UserProfile, EligibilityRule, EligibilityResult } from './types'

export class EligibilityEngine {
  private rules: EligibilityRule[] = []

  loadRules(rules: EligibilityRule[]) {
    this.rules = rules
  }

  evaluate(profile: UserProfile, benefitId: string): EligibilityResult {
    const benefitRules = this.rules.filter((r) => r.benefitId === benefitId)
    if (benefitRules.length === 0) {
      return { benefitId, eligible: false, score: 0, passedRules: [], failedRules: [], reasons: ['No rules defined'], missingCriteria: [] }
    }

    const passedRules: string[] = []
    const failedRules: string[] = []
    const reasons: string[] = []
    const missingCriteria: string[] = []
    let totalWeight = 0
    let passedWeight = 0

    for (const rule of benefitRules) {
      totalWeight += rule.weight
      const passed = this.evaluateRule(profile, rule)
      if (passed) {
        passedRules.push(rule.id)
        passedWeight += rule.weight
        reasons.push(this.getRuleReason(rule, true))
      } else {
        failedRules.push(rule.id)
        missingCriteria.push(this.getRuleReason(rule, false))
      }
    }

    const score = totalWeight > 0 ? Math.round((passedWeight / totalWeight) * 100) : 0
    const eligible = failedRules.length === 0 && score >= 60

    return { benefitId, eligible, score, passedRules, failedRules, reasons, missingCriteria }
  }

  private evaluateRule(profile: UserProfile, rule: EligibilityRule): boolean {
    switch (rule.type) {
      case 'income_limit': {
        const limit = rule.params['limit'] as number
        const multiplier = rule.params['fplMultiplier'] as number | undefined
        const fpl = this.getFPL(profile.householdSize)
        const threshold = multiplier ? fpl * multiplier : limit
        return profile.monthlyIncome * 12 <= threshold
      }
      case 'household_size': {
        const min = rule.params['min'] as number | undefined
        const max = rule.params['max'] as number | undefined
        if (min !== undefined && profile.householdSize < min) return false
        if (max !== undefined && profile.householdSize > max) return false
        return true
      }
      case 'employment': {
        const statuses = rule.params['statuses'] as string[]
        return statuses.includes(profile.employmentStatus)
      }
      case 'residency': {
        const countries = rule.params['countries'] as string[]
        return countries.includes(profile.country)
      }
      case 'age': {
        const min = rule.params['min'] as number | undefined
        const max = rule.params['max'] as number | undefined
        if (!profile.age) return true
        if (min !== undefined && profile.age < min) return false
        if (max !== undefined && profile.age > max) return false
        return true
      }
      case 'flag': {
        const flag = rule.params['flag'] as keyof UserProfile
        return !!profile[flag]
      }
      default:
        return true
    }
  }

  private getFPL(householdSize: number): number {
    const baseFPL = 15060
    const additionalPerPerson = 5380
    return baseFPL + (householdSize - 1) * additionalPerPerson
  }

  private getRuleReason(rule: EligibilityRule, passed: boolean): string {
    const prefix = passed ? '✓' : '✗'
    switch (rule.type) {
      case 'income_limit':
        return `${prefix} Income ${passed ? 'within' : 'exceeds'} program limits`
      case 'household_size':
        return `${prefix} Household size ${passed ? 'qualifies' : 'does not qualify'}`
      case 'employment':
        return `${prefix} Employment status ${passed ? 'eligible' : 'not eligible'}`
      case 'residency':
        return `${prefix} Country ${passed ? 'covered' : 'not covered'} by program`
      case 'flag':
        return `${prefix} ${String(rule.params['flag'])} requirement ${passed ? 'met' : 'not met'}`
      default:
        return `${prefix} Rule ${rule.id} ${passed ? 'passed' : 'failed'}`
    }
  }
}
