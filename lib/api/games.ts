import { igdbClient } from './igdb'
import { rawgClient } from './rawg'

export async function searchGames(query: string) {
  try {
    // Try IGDB first
    const igdbResults = await igdbClient.searchGames(query)

    if (igdbResults.length > 0) {
      return igdbResults
    }

    // Fallback to RAWG
    const rawgResults = await rawgClient.searchGames(query)
    return rawgResults.results
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
