import { NextResponse } from 'next/server'
import { searchGames, getGame } from '@/lib/api/games'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  try {
    switch (action) {
      case 'search':
        const query = searchParams.get('q') || 'Elden Ring'
        const searchResults = await searchGames(query)
        return NextResponse.json({ success: true, data: searchResults })

      case 'game':
        const gameId = Number(searchParams.get('id')) || 1879
        const game = await getGame(gameId)
        return NextResponse.json({ success: true, data: game })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Test route error:', error)
    return NextResponse.json(
      { error: 'API test failed', details: error },
      { status: 500 }
    )
  }
}
