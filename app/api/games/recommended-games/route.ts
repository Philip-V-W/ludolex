import { NextResponse } from 'next/server'
import { getRecommendedGames } from '@/lib/api/games'
import { stripHtml } from '@/lib/utils'
import { cacheGames, getCachedGames } from '@/lib/api/services/cache'
import { ExtendedGameData } from '@/features/games/types/api/games'
import { RecommendedGame } from '@/components/shared/game-card'

const GAMES_LIMIT = 40

export async function GET() {
  try {
    // Check cache first
    const cachedGames = await getCachedGames({
      limit: GAMES_LIMIT,
      orderBy: [
        { metacritic: 'desc' },
      ],
      where: {
        releaseDate: {
          gte: new Date('2010-01-01').toISOString(),
        },
      },
    })

    // Return cached games if available
    if (cachedGames.length === GAMES_LIMIT) {
      const transformedGames: RecommendedGame[] = cachedGames.map(game => ({
        id: String(game.id),
        title: game.title,
        slug: game.slug,
        image: game.mainImage || '/placeholder.png',
        releaseDate: game.releaseDate ? new Date(game.releaseDate).toLocaleDateString() : 'TBA',
        platforms: game.platforms.map(p => p.platform.slug),
        score: game.metacritic || 0,
        hasVideo: !!game.previewVideoUrl,
      }))
      return NextResponse.json({ success: true, data: transformedGames })
    }

    // Fetch fresh games
    const games = await getRecommendedGames()
    const cachedResults = await cacheGames(games as ExtendedGameData [], stripHtml)

    const validGames: RecommendedGame[] = cachedResults
      .filter(Boolean)
      .map(game => ({
        id: String(game!.id),
        title: game!.title,
        slug: game!.slug,
        image: game!.mainImage || '/placeholder.png',
        releaseDate: game!.releaseDate ? new Date(game!.releaseDate).toLocaleDateString() : 'TBA',
        platforms: game!.platforms.map(p => p.platform.slug),
        score: game!.metacritic || 0,
        hasVideo: !!game!.previewVideoUrl,
      }))

    return NextResponse.json({ success: true, data: validGames })
  } catch (error) {
    console.error('Error in recommended games route:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch games' },
      { status: 500 },
    )
  }
}