import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import OpenAI from 'openai'
import { BenefitsService } from '../benefits/benefits.service'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name)
  private openai: OpenAI

  constructor(
    private configService: ConfigService,
    private benefitsService: BenefitsService
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    })
  }

  async chat(message: string, history: ChatMessage[] = [], userProfile?: unknown): Promise<string> {
    const systemPrompt = `You are AIDA, an expert AI benefits advisor helping citizens find and apply for government benefits.
You have deep knowledge of social welfare programs, eligibility criteria, and application processes across 15+ countries.
Be clear, empathetic, and precise. Always recommend the user complete their profile for personalised matches.
${userProfile ? 'User profile: ' + JSON.stringify(userProfile) : ''}
Never provide legal advice. Always refer users to official government websites for final applications.`

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: message },
    ]

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 800,
        temperature: 0.7,
      })
      return completion.choices[0]?.message?.content ?? 'I could not generate a response. Please try again.'
    } catch (error) {
      this.logger.error('OpenAI API error:', error)
      return 'I am temporarily unavailable. Please try again in a moment.'
    }
  }

  async checkEligibility(profile: {
    country: string
    householdSize: number
    monthlyIncome: number
    hasChildren: boolean
    hasDisability: boolean
    isVeteran: boolean
    employmentStatus: string
  }) {
    const { data: benefits } = await this.benefitsService.findAll({
      country: profile.country,
      limit: 50,
    })

    const prompt = `Given this user profile: ${JSON.stringify(profile)}
    
And these available benefits: ${JSON.stringify(benefits.map((b: { id: string; name: string; eligibilitySummary: string }) => ({
      id: b.id,
      name: b.name,
      eligibilitySummary: b.eligibilitySummary,
    })))}

Return a JSON array of eligibility results with this format for each benefit:
{"benefitId": "...", "eligible": true/false, "score": 0-100, "reasons": ["..."], "missingCriteria": ["..."]}

Be accurate based on standard eligibility rules. Return only the JSON array, no other text.`

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.3,
        response_format: { type: 'json_object' },
      })

      const content = completion.choices[0]?.message?.content ?? '{"results":[]}'
      const parsed = JSON.parse(content)
      return parsed.results ?? parsed
    } catch (error) {
      this.logger.error('Eligibility check error:', error)
      return []
    }
  }
}
