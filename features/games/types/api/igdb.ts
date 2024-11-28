export interface IGDBAccessToken {
  access_token: string
  expires_in: number
  token_type: string
}

export interface IGDBGame {
  id: number
  name: string
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
}