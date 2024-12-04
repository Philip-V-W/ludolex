import { NextRequest, NextResponse } from 'next/server'
import { searchGames } from '@/lib/api/games'
import { getCachedGames, cacheGames } from '@/lib/api/services/cache'
import { stripHtml } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ success: false, error: 'Query is required' }, { status: 400 })
  }

  try {
    const cachedGames = await getCachedGames({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      limit: 5,
    })

    if (cachedGames.length >= 3) {
      return NextResponse.json({
        success: true,
        data: cachedGames,
      })
    }

    const searchResults = await searchGames(query)
    const cachedResults = await cacheGames(searchResults, stripHtml)

    return NextResponse.json({
      success: true,
      data: cachedResults,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to search games' },
      { status: 500 },
    )
  }
}