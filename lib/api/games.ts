import { igdbClient } from './igdb'
import { rawgClient } from './rawg'
import {
  IGDBGame,
  RAWGGame,
  RAWGGameDetails,
  RAWGResponse,
} from '@/features/games/types'
import {
  transformIGDBGame,
  transformRAWGGame,
} from '@/features/games/utils/transformers'
import { ExtendedGameData, TransformedGame } from '@/features/games/types/api/games'

export async function searchGames(query: string): Promise<TransformedGame[]> {
  if (!query.trim()) {
    return []
  }

  try {
    // IGDB Search
    const igdbQuery = `
      search "${query.replace(/"/g, '\\"')}";
      fields name,slug,cover.*,first_release_date,summary,rating,genres.*,platforms.*;
      limit 10;
    `
    const igdbResults = await igdbClient.fetch<IGDBGame[]>('games', igdbQuery)
    if (igdbResults?.length > 0) {
      return igdbResults.map(transformIGDBGame)
    }

    // RAWG Search fallback
    const rawgResults = await rawgClient.fetch<RAWGResponse<RAWGGame>>('games', {
      search: query,
      page: '1',
      page_size: '10',
    })
    return rawgResults?.results?.map(transformRAWGGame) || []
  } catch (error) {
    console.error('Error searching games:', error)
    return []
  }
}

export async function getGame(identifier: string | number): Promise<TransformedGame | null> {
  try {
    if (typeof identifier === 'number') {
      const igdbQuery = `
        fields name,slug,cover.*,first_release_date,summary,rating,genres.*,platforms.*;
        where id = ${identifier};
      `
      const [igdbGame] = await igdbClient.fetch<IGDBGame[]>('games', igdbQuery)
      return igdbGame ? transformIGDBGame(igdbGame) : null
    }

    const rawgGame = await rawgClient.fetch<RAWGGame>(`games/${identifier}`)
    return rawgGame ? transformRAWGGame(rawgGame) : null
  } catch (error) {
    console.error('Error fetching game:', error)
    return null
  }
}

export async function getTrendingGames(): Promise<TransformedGame[]> {
  try {
    const today = new Date()
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30))
    const dateRange = `${thirtyDaysAgo.toISOString().split('T')[0]},${new Date().toISOString().split('T')[0]}`

    const response = await rawgClient.fetch<RAWGResponse<RAWGGame>>('games', {
      ordering: '-relevance',
      dates: dateRange,
      page_size: '10',
    })

    if (!response?.results?.length) {
      return []
    }

    const gamesWithDetails = await Promise.all(
      response.results.map(async game => {
        try {
          const details = await rawgClient.fetch<RAWGGameDetails>(`games/${game.id}`)

          const screenshots = await rawgClient.fetch<{ results: { image: string }[] }>(
            `games/${game.id}/screenshots`,
          )

          return transformRAWGGame({
            ...game,
            ...details,
            description: details.description || game.description,
            short_screenshots: screenshots.results?.map(s => ({
              id: 0,
              image: s.image,
            })) || [],
          })
        } catch (error) {
          console.error(`Error fetching details for game ${game.slug}:`, error)
          return transformRAWGGame(game)
        }
      }),
    )

    return gamesWithDetails.filter(Boolean)
  } catch (error) {
    console.error('Error fetching trending games:', error)
    return []
  }
}

export async function getTopRatedGames(): Promise<ExtendedGameData[]> {
  try {
    const response = await rawgClient.fetch<RAWGResponse<RAWGGame>>('games', {
      ordering: '-metacritic',
      page_size: '20',
      metacritic: '90,100',
    })

    if (!response?.results?.length) {
      return []
    }

    const gamesWithDetails = await Promise.all(
      response.results.map(async game => {
        try {
          const details = await rawgClient.fetch<RAWGGame>(`games/${game.id}`)
          return transformRAWGGame({
            ...game,
            ...details,
          })
        } catch (error) {
          console.error(`Error fetching details for game ${game.slug}:`, error)
          return transformRAWGGame(game)
        }
      }),
    )

    return gamesWithDetails.filter(Boolean)
  } catch (error) {
    console.error('Error fetching top rated games:', error)
    return []
  }
}

export async function getMostAnticipatedGames(): Promise<ExtendedGameData[]> {
  try {
    const today = new Date().toISOString().split('T')[0]

    const response = await rawgClient.fetch<RAWGResponse<RAWGGame>>('games', {
      dates: `${today},2030-01-01`,
      ordering: 'released',
      page_size: '20',
    })

    if (!response?.results?.length) {
      return []
    }

    const gamesWithDetails = await Promise.all(
      response.results.map(async game => {
        try {
          const details = await rawgClient.fetch<RAWGGame>(`games/${game.id}`)
          return transformRAWGGame({
            ...game,
            ...details,
          })
        } catch (error) {
          console.error(`Error fetching details for game ${game.slug}:`, error)
          return transformRAWGGame(game)
        }
      }),
    )

    return gamesWithDetails.filter(Boolean)
  } catch (error) {
    console.error('Error fetching most anticipated games:', error)
    return []
  }
}

export async function getRecommendedGames(): Promise<ExtendedGameData[]> {
  try {
    const response = await rawgClient.fetch<RAWGResponse<RAWGGame>>('games', {
      metacritic: '80,100',
      ordering: '-metacritic,-rating,-added',
      platforms: '1,2,3,4,5,6,7,8,14,80,83,169,186,187',
      page_size: '40',
      dates: '2000-01-01,2024-12-31',
    })

    if (!response?.results?.length) {
      return []
    }

    const gamesWithDetails = await Promise.all(
      response.results.map(async game => {
        try {
          const details = await rawgClient.fetch<RAWGGame>(`games/${game.id}`)
          return transformRAWGGame({
            ...game,
            ...details,
          })
        } catch (error) {
          console.error(`Error fetching details for game ${game.slug}:`, error)
          return transformRAWGGame(game)
        }
      }),
    )

    return gamesWithDetails.filter(Boolean)
  } catch (error) {
    console.error('Error fetching recommended games:', error)
    return []
  }
}