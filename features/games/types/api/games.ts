import { CompanyRole } from '@prisma/client'

export interface CompanyData {
  name: string
  slug: string
  role: CompanyRole
}

export interface BaseGame {
  id: string
  title: string
  slug: string
  description: string
  mainImage: string | null
  thumbnails?: string[]
  platforms?: {
    name: string
    slug: string
    requirements?: {
      minimum?: string
      recommended?: string
    }
  }[]
  genres?: string[]
  score?: number
}

export interface TransformedGame extends BaseGame {
  id: string
  title: string
  slug: string
  description: string
  mainImage: string | null
  thumbnails?: string[]
  platforms?: {
    name: string
    slug: string
    requirements?: {
      minimum?: string
      recommended?: string
    }
  }[]
  genres?: string[]
  score?: number
}

export interface ExtendedGameData extends TransformedGame {
  rawgId: number | null
  igdbId: number | null
  releaseDate: string | null
  ageRating: number | null
  rating: number | null
  supportedLanguages: string[]
  systemRequirements: Record<string, { minimum?: string; recommended?: string }> | null
  stores?: {
    url: string
    store: {
      id: number
      name: string
      slug: string
    }
  }[]
  companies?: CompanyData[]
  fullVideoUrl: string | null
  previewVideoUrl: string | null
  videoPreview: string | null
}

