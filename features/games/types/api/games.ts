import { SystemRequirements } from '@/features/games/types'

export interface TransformedGame {
  title: string
  description: string
  mainImage: string | null
  thumbnails?: string[]
  platforms?: {
    name: string
    slug: string
  }[]
  genres?: string[]
  score?: number
}

export interface ExtendedTransformedGame extends TransformedGame {
  rawgId?: number
  releaseDate?: string
  ageRating?: number
  supportedLanguages?: string[]
  systemRequirements?: SystemRequirements | null
}

export interface ExtendedGameData extends TransformedGame {
  rawgId: number | null
  releaseDate: string | null
  ageRating: number | null
  supportedLanguages: string[]
  systemRequirements: SystemRequirements | null
  fullVideoUrl: string | null
  previewVideoUrl: string | null
  videoPreview: string | null
}