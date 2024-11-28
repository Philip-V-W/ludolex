import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getGame } from '@/lib/api/games'
import { stripHtml } from '@/lib/utils'
import { getCachedGames, cacheGames } from '@/lib/api/services/cache'

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

    // Return cached games if available
    if (cachedGame) {
      return NextResponse.json({
        success: true,
        data: {
          id: String(cachedGame.id),
          title: cachedGame.title,
          description: stripHtml(cachedGame.description || ''),
          mainImage: cachedGame.mainImage || '/placeholder.png',
          screenshots: cachedGame.screenshots || [],
          previewVideoUrl: cachedGame.previewVideoUrl,
          fullVideoUrl: cachedGame.fullVideoUrl,
          videoPreview: cachedGame.videoPreview,
          platforms: cachedGame.platforms.map(p => ({
            name: p.platform.name,
            slug: p.platform.slug,
          })),
          genres: cachedGame.genres.map(g => g.genre.name),
          metacritic: cachedGame.metacritic || 0,
        },
      })
    }

    // Fetch fresh games
    const gameData = await getGame(slug)
    if (!gameData) {
      return NextResponse.json(
        { success: false, error: 'Game not found' },
        { status: 404 },
      )
    }

    // Cache the fresh data
    const [cachedResult] = await cacheGames([gameData], stripHtml)

    if (!cachedResult) {
      return NextResponse.json(
        { success: false, error: 'Failed to cache game data' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: String(cachedResult.id),
        title: cachedResult.title,
        description: stripHtml(cachedResult.description || ''),
        mainImage: cachedResult.mainImage || '/placeholder.png',
        screenshots: cachedResult.screenshots || [],
        previewVideoUrl: cachedResult.previewVideoUrl,
        fullVideoUrl: cachedResult.fullVideoUrl,
        videoPreview: cachedResult.videoPreview,
        platforms: cachedResult.platforms.map(p => ({
          name: p.platform.name,
          slug: p.platform.slug,
        })),
        genres: cachedResult.genres.map(g => g.genre.name),
        metacritic: cachedResult.metacritic || 0,
      },
    })
  } catch (error) {
    console.error('Error fetching game:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch game' },
      { status: 500 },
    )
  }
}