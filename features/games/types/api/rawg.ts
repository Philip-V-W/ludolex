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
  rating: number
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
  }[]
  genres: {
    id: number
    name: string
    slug: string
  }[]
}

// export interface TransformedGame {
//   id: string
//   title: string
//   description: string
//   mainImage: string
//   thumbnails: string[]
//   platforms: {
//     name: string
//     slug: string
//   }[]
//   genres: string[]
//   score: number
// }