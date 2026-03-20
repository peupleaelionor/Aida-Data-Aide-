import { BaseCrawler } from '../base-crawler'
import type { CrawledBenefit } from '../types'

export class USBenefitsCrawler extends BaseCrawler {
  constructor() {
    super('US', 'https://www.benefits.gov')
  }

  async crawl(): Promise<CrawledBenefit[]> {
    // In production, this would scrape benefits.gov
    // Returning mock data for development
    console.log(`Crawling ${this.baseUrl}...`)
    return [
      {
        name: 'SNAP Food Assistance',
        description: 'Provides nutrition benefits for low-income families.',
        category: 'food',
        country: 'US',
        amount: 'Up to $973/month',
        currency: 'USD',
        eligibilitySummary: 'Income at or below 130% of the federal poverty level.',
        applicationUrl: 'https://www.fns.usda.gov/snap/apply',
        sourceUrl: 'https://www.benefits.gov/benefit/361',
        crawledAt: new Date(),
      },
    ]
  }
}
