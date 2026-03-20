import { MeiliSearch } from 'meilisearch'

export class MeilisearchClient {
  private client: MeiliSearch

  constructor(host: string, apiKey: string) {
    this.client = new MeiliSearch({ host, apiKey })
  }

  async indexBenefits(benefits: Array<Record<string, unknown>>) {
    const index = this.client.index('benefits')
    await index.updateSettings({
      searchableAttributes: ['name', 'description', 'eligibilitySummary', 'category'],
      filterableAttributes: ['country', 'category', 'isActive'],
      sortableAttributes: ['name', 'createdAt'],
      rankingRules: ['words', 'typo', 'proximity', 'attribute', 'sort', 'exactness'],
    })
    return index.addDocuments(benefits)
  }

  async searchBenefits(query: string, filters?: { country?: string; category?: string }) {
    const index = this.client.index('benefits')
    const filterParts: string[] = ['isActive = true']
    if (filters?.country) filterParts.push(`country = "${filters.country}"`)
    if (filters?.category) filterParts.push(`category = "${filters.category}"`)

    return index.search(query, {
      filter: filterParts.join(' AND '),
      attributesToHighlight: ['name', 'description'],
      limit: 20,
    })
  }
}
