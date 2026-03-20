import axios from 'axios'
import * as cheerio from 'cheerio'
import type { CrawledBenefit } from './types'

export abstract class BaseCrawler {
  protected readonly country: string
  protected readonly baseUrl: string

  constructor(country: string, baseUrl: string) {
    this.country = country
    this.baseUrl = baseUrl
  }

  protected async fetchPage(url: string): Promise<cheerio.CheerioAPI> {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'AIDA Benefits Crawler/1.0 (government-benefits-finder.gov)',
        'Accept': 'text/html,application/xhtml+xml',
      },
      timeout: 30000,
    })
    return cheerio.load(data)
  }

  abstract crawl(): Promise<CrawledBenefit[]>
}
