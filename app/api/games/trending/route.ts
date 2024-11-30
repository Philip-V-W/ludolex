import { NextResponse } from 'next/server'
import { getTrendingGames } from '@/lib/api/games'
import { stripHtml } from '@/lib/utils'
import { cacheGames, getCachedGames } from '@/lib/api/services/cache'

const GAMES_LIMIT = 10

export async function GET() {
  try {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const cachedGames = await getCachedGames({
      limit: GAMES_LIMIT,
      where: {
        AND: {
          metacritic: {
            gte: 75,
          },
          releaseDate: {
            gte: thirtyDaysAgo,
            lte: new Date(),
          },
        },
      },
      orderBy: [
        { metacritic: 'desc' },
        { releaseDate: 'desc' },
      ],
    })

    // Transform cached games with proper relationship handling
    const transformedGames = cachedGames.map(game => ({
      id: String(game.id),
      title: game.title,
      slug: game.slug,
      description: stripHtml(game.description || ''),
      mainImage: game.mainImage || '/placeholder.png',
      thumbnails: game.screenshots || [],
      platforms: game.platforms?.map(p => ({
        name: p.platform.name,
        slug: p.platform.slug,
      })) || [],
      genres: game.genres?.map(g => ({
        name: g.genre.name,
        slug: g.genre.slug,
      })) || [],
      score: game.metacritic || 0,
    }))

    if (cachedGames.length === GAMES_LIMIT) {
      return NextResponse.json({ success: true, data: transformedGames })
    }

    // Similar transformation for fresh games
    const games = await getTrendingGames()
    const cachedResults = await cacheGames(games, stripHtml)

    const validGames = cachedResults
      .filter(Boolean)
      .map(game => ({
        id: String(game!.id),
        title: game!.title,
        slug: game!.slug,
        description: stripHtml(game!.description || ''),
        mainImage: game!.mainImage || '/placeholder.png',
        thumbnails: game!.screenshots || [],
        platforms: game!.platforms?.map(p => ({
          name: p.platform.name,
          slug: p.platform.slug,
        })) || [],
        genres: game!.genres?.map(g => g.genre.name) || [],
        score: game!.metacritic || 0,
      }))

    return NextResponse.json({ success: true, data: validGames })
  } catch (error) {
    console.error('Error fetching trending games:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch games' },
      { status: 500 },
    )
  }
}