export interface IGDBCompany {
  id: number
  name: string
  slug: string
  developed?: number[]
  published?: number[]
  url?: string
}

export interface IGDBGame {
  id: number
  name: string
  slug: string
  summary?: string
  cover?: {
    url: string
  }
  rating?: number
  platforms?: Array<{
    abbreviation?: string
    name: string
  }>
  genres?: Array<{
    name: string
  }>
  involved_companies?: Array<{
    id: number
    company: IGDBCompany
    developer: boolean
    publisher: boolean
    porting: boolean
  }>
  language_supports?: Array<{
    language: {
      name: string
    }
    language_support_type: {
      name: string
    }
  }>
}