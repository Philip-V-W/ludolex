import { igdbClient } from './igdb'
import { rawgClient } from './rawg'
import { IGDBGame, RAWGGame, RAWGGameDetails, RAWGResponse } from '@/features/games/types'
import { transformIGDBGame, transformRAWGGame } from '@/features/games/utils/transformers'
import { CompanyData, ExtendedGameData, GamesListOptions } from '@/features/games/types/api/games'
import { CompanyRole } from '@prisma/client'

export async function searchGames(query: string): Promise<ExtendedGameData[]> {
  if (!query.trim()) {
    return []
  }

  try {
    // RAWG Search first
    const rawgResults = await rawgClient.fetch<RAWGResponse<RAWGGame>>('games', {
      search: query,
      page: '1',
      page_size: '10',
    })

    if (rawgResults?.results?.length > 0) {
      // Return preview data only for search results
      return rawgResults.results.map(game => transformRAWGGame({
        ...game,
        description: '',
        short_screenshots: [],
        stores: [],
      }))
    }

    // IGDB Search fallback
    const igdbQuery = `
      search "${query.replace(/"/g, '\\"')}";
      fields 
        name,
        slug,
        cover.*,
        first_release_date,
        rating,
        genres.*,
        platforms.*;
      limit 10;
    `
    const igdbResults = await igdbClient.fetch<IGDBGame[]>('games', igdbQuery)
    if (!igdbResults?.length) return []

    // Return preview data from IGDB
    return igdbResults.map(game => transformIGDBGame(game))
  } catch (error) {
    console.error('Error searching games:', error)
    return []
  }
}

async function getGamesList({ params, includeDetails = false }: GamesListOptions): Promise<ExtendedGameData[]> {
  try {
    const response = await rawgClient.fetch<RAWGResponse<RAWGGame>>('games', params)

    if (!response?.results?.length) {
      return []
    }

    if (includeDetails) {
      // Fetch additional details when required
      return Promise.all(
        response.results.map(async game => {
          try {
            const [details, screenshots] = await Promise.all([
              rawgClient.fetch<RAWGGameDetails>(`games/${game.id}`),
              rawgClient.fetch<{ results: { image: string }[] }>(`games/${game.id}/screenshots`),
            ])

            return transformRAWGGame({
              ...game,
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
    }

    return response.results.map(transformRAWGGame)
  } catch (error) {
    console.error('Error fetching games list:', error)
    return []
  }
}

export async function getTrendingGames(): Promise<ExtendedGameData[]> {
  const today = new Date()
  const thirtyDaysAgo = new Date(today)
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 90)

  return getGamesList({
    params: {
      ordering: '-relevance,-added',
      dates: `${thirtyDaysAgo.toISOString().split('T')[0]},${today.toISOString().split('T')[0]}`,
      page_size: '10',
      parent_platforms: '1,2,3',
      exclude_additions: 'true',
    },
    includeDetails: true,
  })
}

export async function getTopRatedGames(): Promise<ExtendedGameData[]> {
  return getGamesList({
    params: {
      ordering: '-metacritic',
      page_size: '20',
      metacritic: '90,100',
    },
  })
}

export async function getMostAnticipatedGames(): Promise<ExtendedGameData[]> {
  const today = new Date().toISOString().split('T')[0]

  return getGamesList({
    params: {
      dates: `${today},2030-01-01`,
      ordering: 'released',
      page_size: '20',
    },
  })
}

export async function getRecommendedGames(): Promise<ExtendedGameData[]> {
  return getGamesList({
    params: {
      metacritic: '80,100',
      ordering: '-metacritic,-rating,-added',
      platforms: '1,2,3,4,5,6,7,8,14,80,83,169,186,187',
      page_size: '40',
      dates: '2000-01-01,2024-12-31',
    },
  })
}

// Full game details fetcher for game details page
export async function getGameDetails(identifier: string | number): Promise<ExtendedGameData | null> {
  try {
    // Clean up the identifier if it's a string (slug)
    const searchTerm = typeof identifier === 'string'
      ? identifier.replace(/-/g, ' ').trim()
      : identifier.toString()

    // Try searching first instead of direct slug lookup
    const searchResults = await rawgClient.fetch<RAWGResponse<RAWGGame>>('games', {
      search: searchTerm,
      page_size: '1',
      search_precise: 'true',
    })

    let rawgGame: RAWGGameDetails | null = null

    if (searchResults?.results?.[0]) {
      // Get full details for the found game
      try {
        rawgGame = await rawgClient.fetch<RAWGGameDetails>(`games/${searchResults.results[0].id}`)
      } catch (error) {
        console.error(`Failed to fetch details for game ID ${searchResults.results[0].id}:`, error)
      }
    }

    // If search didn't work and we have a string identifier, try direct slug lookup as fallback
    if (!rawgGame && typeof identifier === 'string') {
      try {
        rawgGame = await rawgClient.fetch<RAWGGameDetails>(`games/${identifier}`)
      } catch (error) {
        console.error(`Failed to fetch game by slug ${identifier}:`, error)
      }
    }

    // If we still don't have the game, try IGDB as last resort
    if (!rawgGame) {
      try {
        const igdbResults = await igdbClient.fetch<IGDBGame[]>('games', `
          search "${searchTerm.replace(/"/g, '\\"')}";
          fields 
            name,
            slug,
            summary,
            cover.*,
            first_release_date,
            rating,
            genres.*,
            platforms.*,
            involved_companies.company.*,
            involved_companies.developer,
            involved_companies.publisher,
            involved_companies.porting,
            language_supports.language.name;
          limit 1;
        `)

        if (igdbResults?.[0]) {
          return transformIGDBGame(igdbResults[0])
        }
      } catch (error) {
        console.error(`Failed to fetch from IGDB for ${searchTerm}:`, error)
      }
    }

    if (!rawgGame) {
      console.log(`No game found for identifier: ${identifier}`)
      return null
    }

    // Now that we have the game, fetch additional data in parallel
    const [screenshots, igdbData] = await Promise.all([
      // Get screenshots
      rawgClient.fetch<{ results: { image: string }[] }>(`games/${rawgGame.id}/screenshots`)
        .catch(() => ({ results: [] })),

      // Get IGDB data for enrichment
      igdbClient.fetch<IGDBGame[]>('games', `
        search "${rawgGame.name.replace(/"/g, '\\"')}";
        fields 
          name,
          slug,
          involved_companies.company.*,
          involved_companies.developer,
          involved_companies.publisher,
          involved_companies.porting,
          language_supports.language.name;
        limit 1;
      `).then(results => results[0]).catch(() => null),
    ])

    // Transform RAWG data with screenshots
    const baseGameData = transformRAWGGame({
      ...rawgGame,
      short_screenshots: screenshots.results?.map(s => ({
        id: 0,
        image: s.image,
      })) || [],
    })

    // If we have IGDB data, merge it
    if (igdbData) {
      const companies: CompanyData[] = []

      igdbData.involved_companies?.forEach(ic => {
        if (ic.developer) {
          companies.push({
            name: ic.company.name,
            slug: ic.company.slug || ic.company.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            role: CompanyRole.DEVELOPER,
          })
        }
        if (ic.publisher) {
          companies.push({
            name: ic.company.name,
            slug: ic.company.slug || ic.company.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            role: CompanyRole.PUBLISHER,
          })
        }
        if (ic.porting) {
          companies.push({
            name: ic.company.name,
            slug: ic.company.slug || ic.company.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            role: CompanyRole.PORT_DEVELOPER,
          })
        }
      })

      return {
        ...baseGameData,
        igdbId: igdbData.id,
        companies,
        supportedLanguages: igdbData.language_supports?.map(ls => ls.language.name) || baseGameData.supportedLanguages,
      }
    }

    return baseGameData
  } catch (error) {
    console.error('Error in getGameDetails:', error)
    return null
  }
}
