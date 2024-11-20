import { NextResponse } from 'next/server'
import { searchGames } from '@/lib/api/games'
import { cacheGame } from '@/lib/api/cache'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    )
  }

  try {
    const games = await searchGames(query)

    // Cache results in background
    games.forEach((game) => {
      cacheGame(game).catch(console.error)
    })

    return NextResponse.json(games)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Failed to search games' },
      { status: 500 }
    )
  }
}
