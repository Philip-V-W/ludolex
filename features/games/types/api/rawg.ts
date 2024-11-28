export interface SystemRequirements {
  minimum?: string
  recommended?: string
}

export interface RAWGResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface RAWGGame {
  id: number
  slug: string
  name: string
  description?: string
  released: string
  background_image: string | null
  rating: number | null
  metacritic: number | null
  short_screenshots?: {
    id: number
    image: string
  }[]
  platforms: {
    platform: {
      id: number
      slug: string
      name: string
    }
    requirements?: SystemRequirements
  }[]
  genres: {
    id: number
    name: string
    slug: string
  }[]
  esrb_rating?: {
    id: number
    name: string
    slug: string
  }
  languages?: string[]
}

export interface RAWGGameDetails extends RAWGGame {
  requirements?: SystemRequirements
}