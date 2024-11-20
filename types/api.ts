export interface Game {
  id: number
  name: string
  slug: string
  description?: string
  released?: string
  background_image?: string
  rating?: number
  metacritic?: number
}

// IGDB specific types
export namespace IGDB {
  export interface AccessToken {
    access_token: string
    expires_in: number
    token_type: string
  }

  export interface Game extends Game {
    cover?: {
      id: number
      url: string
    }
    age_ratings?: Array<{
      category: number
      rating: number
    }>
    genres?: Array<{
      id: number
      name: string
    }>
    platforms?: Array<{
      id: number
      name: string
    }>
  }
}

// RAWG specific types
export namespace RAWG {
  export interface Response<T> {
    count: number
    next: string | null
    previous: string | null
    results: T[]
  }

  export interface Game extends Game {
    tba: boolean
    rating_top: number
    ratings_count: number
    platforms?: Array<{
      platform: {
        id: number
        name: string
      }
    }>
    genres?: Array<{
      id: number
      name: string
    }>
  }
}
