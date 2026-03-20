import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'

export interface BenefitMatch {
  benefitId: string
  benefitName: string
  eligible: boolean
  score: number
  reasons: string[]
}

export class BenefitsAdvisor {
  private model: ChatOpenAI

  constructor(apiKey: string) {
    this.model = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName: 'gpt-4o-mini',
      temperature: 0.3,
    })
  }

  async chat(message: string, systemContext?: string): Promise<string> {
    const messages = [
      new SystemMessage(
        systemContext ??
          'You are AIDA, an expert government benefits advisor. Help citizens find and apply for benefits they qualify for. Be clear, accurate, and empathetic.'
      ),
      new HumanMessage(message),
    ]
    const response = await this.model.invoke(messages)
    return typeof response.content === 'string' ? response.content : JSON.stringify(response.content)
  }

  async matchBenefits(
    profile: Record<string, unknown>,
    benefits: Array<{ id: string; name: string; eligibilitySummary: string }>
  ): Promise<BenefitMatch[]> {
    const prompt = `Profile: ${JSON.stringify(profile)}
Available benefits: ${JSON.stringify(benefits)}
Return JSON array of matches with {benefitId, benefitName, eligible, score (0-100), reasons[]}`

    const response = await this.model.invoke([new HumanMessage(prompt)])
    try {
      const content = typeof response.content === 'string' ? response.content : ''
      return JSON.parse(content)
    } catch {
      return []
    }
  }
}
