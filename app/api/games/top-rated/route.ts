import { NextResponse } from 'next/server'
import { getTopRatedGames } from '@/lib/api/games'
import { stripHtml } from '@/lib/utils'
import { cacheGames, getCachedGames } from '@/lib/api/services/cache'
import { ExtendedGameData } from '@/features/games/types/api/games'

const GAMES_LIMIT = 20

export async function GET() {
  try {
    // Check cache first
    const cachedGames = await getCachedGames({
      limit: GAMES_LIMIT,
      orderBy: [
        { metacritic: 'desc' },
      ],
      where: { metacritic: { not: null } },
    })

    // Return cached games if available
    if (cachedGames.length === GAMES_LIMIT) {
      const transformedGames = cachedGames.map(game => ({
        id: String(game.id),
        title: game.title,
        slug: game.slug,
        mainImage: game.mainImage || '/placeholder.png',
        platforms: game.platforms.map(p => ({
          name: p.platform.name,
          slug: p.platform.slug,
        })),
        score: game.metacritic ?? 0,
      }))
      return NextResponse.json({ success: true, data: transformedGames })
    }

    // Fetch fresh games
    const games = await getTopRatedGames()
    const cachedResults = await cacheGames(games as ExtendedGameData [], stripHtml)

    const validGames = cachedResults
      .filter((game): game is NonNullable<typeof game> => game !== null)
      .map(game => ({
        id: String(game.id),
        title: game.title,
        slug: game.slug,
        mainImage: game.mainImage || '/placeholder.png',
        platforms: game.platforms.map(p => ({
          name: p.platform.name,
          slug: p.platform.slug,
        })),
        score: game.metacritic ?? 0,
      }))

    return NextResponse.json({ success: true, data: validGames })
  } catch (error) {
    console.error('Error in top-rated route:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch games' },
      { status: 500 },
    )
  }
}