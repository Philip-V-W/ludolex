// export interface Game {
//   id: number
//   slug: string
//   title: string
//   description: string
//   mainImage: string
//   screenshots: string
//   releaseDate: string
//   metacritic: number
//   developers: string[]
//   publishers: string[]
//   genres: string[]
//   platforms: Platform[]
//   languages: Language[]
//   stores: Store[]
//   ageRatings: AgeRating[]
// }
//
// export interface Platform {
//   name: string
// }
//
// export interface Store {
//   id: string
//   name: string
//   url: string
//   icon: string
// }
//
// export interface Language {
//   name: string
//   supported: boolean
// }
//
// export interface AgeRating {
//   system: string
//   rating: string
//   icon: string
// }
//
// export interface GameMedia {
//   id: string
//   type: 'video' | 'image'
//   thumbnail: string
//   url: string
//   title?: string
// }

export * from './api/igdb'
export * from './api/rawg'
export * from './shared'