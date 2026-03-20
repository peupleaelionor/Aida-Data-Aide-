import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage } from '@langchain/core/messages'

export class DocumentGenerator {
  private model: ChatOpenAI

  constructor(apiKey: string) {
    this.model = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName: 'gpt-4o-mini',
      temperature: 0.4,
    })
  }

  async generateCoverLetter(params: {
    benefitName: string
    applicantName: string
    applicantProfile: Record<string, unknown>
  }): Promise<string> {
    const prompt = `Write a professional cover letter for a ${params.benefitName} benefit application.
Applicant: ${params.applicantName}
Profile: ${JSON.stringify(params.applicantProfile)}
The letter should be formal, concise (2-3 paragraphs), and highlight relevant eligibility factors.`

    const response = await this.model.invoke([new HumanMessage(prompt)])
    return typeof response.content === 'string' ? response.content : ''
  }

  async generateDocumentChecklist(benefitName: string, country: string): Promise<string[]> {
    const prompt = `List the typical documents needed to apply for "${benefitName}" in ${country}.
Return a JSON array of document names only. Be specific and accurate.`

    const response = await this.model.invoke([new HumanMessage(prompt)])
    try {
      const content = typeof response.content === 'string' ? response.content : '[]'
      return JSON.parse(content)
    } catch {
      return ['Government-issued ID', 'Proof of income', 'Proof of residence']
    }
  }
}
