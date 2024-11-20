import { igdbClient } from './igdb'
import { rawgClient } from './rawg'

export async function searchGames(query: string) {
  try {
    // Validate API configuration
    if (!process.env.IGDB_CLIENT_ID || !process.env.IGDB_CLIENT_SECRET) {
      throw new Error('IGDB API configuration missing')
    }

    if (!process.env.RAWG_API_KEY) {
      throw new Error('RAWG API configuration missing')
    }

    // Try IGDB first
    try {
      const igdbResults = await igdbClient.searchGames(query)
      if (igdbResults.length > 0) {
        return igdbResults
      }
    } catch (error) {
      console.error('IGDB search error:', error)
    }

    // Fallback to RAWG
    try {
      const rawgResults = await rawgClient.searchGames(query)
      return rawgResults.results
    } catch (error) {
      console.error('RAWG search error:', error)
    }

    return []
  } catch (error) {
    console.error('Error searching games:', error)
    throw error
  }
}

export async function getGame(identifier: string | number) {
  try {
    if (typeof identifier === 'number') {
      return await igdbClient.getGame(identifier)
    } else {
      return await rawgClient.getGame(identifier)
    }
  } catch (error) {
    console.error('Error fetching game:', error)
    throw error
  }
}
