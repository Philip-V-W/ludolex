import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getGameDetails } from '@/lib/api/games'
import { stripHtml } from '@/lib/utils'
import { getCachedGames, cacheGames } from '@/lib/api/services/cache'
import { isFullyPopulated, transformCachedGame } from '@/features/games/utils/transformers'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const slug = params.id

  try {
    // Check cache first
    const [cachedGame] = await getCachedGames({
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    // Return cached games if available and fully populated
    if (cachedGame && isFullyPopulated(cachedGame)) {
      return NextResponse.json({
        success: true,
        data: transformCachedGame(cachedGame)
      })
    }

    // Fetch fresh data
    const gameData = await getGameDetails(slug)
    if (!gameData) {
      return NextResponse.json(
        {
          success: false,
          error: `Game not found: ${slug}`
        },
        { status: 404 }
      )
    }

    // Cache the fresh data
    const [cachedResult] = await cacheGames([gameData], stripHtml)

    if (!cachedResult) {
      console.error('Failed to cache game data for:', slug)
      // Still return the uncached data instead of failing
      return NextResponse.json({
        success: true,
        data: gameData
      })
    }

    return NextResponse.json({
      success: true,
      data: transformCachedGame(cachedResult)
    })

  } catch (error) {
    console.error('Error in GET /api/games/[id]:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch game data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}