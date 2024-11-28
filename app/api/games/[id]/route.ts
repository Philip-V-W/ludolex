import { NextResponse } from 'next/server'
import { getGame } from '@/lib/api/games'
import { cacheGame, getCachedGame } from '@/lib/api/services/cache'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check cache first
    const cachedGame = await getCachedGame(Number(params.id) || null, params.id)

    if (cachedGame) {
      return NextResponse.json(cachedGame)
    }

    // Fetch fresh data
    const game = await getGame(
      isNaN(Number(params.id)) ? params.id : Number(params.id)
    )

    // Cache in background
    cacheGame(game).catch(console.error)

    return NextResponse.json(game)
  } catch (error) {
    console.error('Game fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch game' }, { status: 500 })
  }
}
