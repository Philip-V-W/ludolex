// // IGDB specific types
// export namespace IGDB {
//   export interface AccessToken {
//     access_token: string
//     expires_in: number
//     token_type: string
//   }
//
//   export interface Game {
//     cover?: {
//       id: number
//       url: string
//     }
//     age_ratings?: Array<{
//       category: number
//       rating: number
//     }>
//     genres?: Array<{
//       id: number
//       name: string
//     }>
//     platforms?: Array<{
//       id: number
//       name: string
//     }>
//   }
// }
//
// // RAWG specific types
// export namespace RAWG {
//   export interface Response<T> {
//     count: number;
//     next: string | null;
//     previous: string | null;
//     results: T[];
//   }
//
//   export interface Game {
//     id: number;
//     slug: string;
//     name: string;
//     released: string;
//     background_image: string | null;
//     rating: number;
//     metacritic: number | null;
//     platforms: {
//       platform: {
//         id: number;
//         slug: string;
//         name: string;
//       };
//       released_at?: string;
//       requirements?: {
//         minimum?: string;
//         recommended?: string;
//       };
//     }[];
//     genres: {
//       id: number;
//       name: string;
//       slug: string;
//     }[];
//     short_screenshots?: {
//       id: number;
//       image: string;
//     }[];
//   }
// }