import { Metadata } from 'next'
import { getCachedGames } from '@/lib/api/services/cache'
import { getGame } from '@/lib/api/games'
import { stripHtml } from '@/lib/utils'
import GameMediaSection from '@/features/games/components/game-details/game-media-section'
import { notFound } from 'next/navigation'

interface GamePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const [game] = await getCachedGames({
    where: { slug: params.slug },
    limit: 1,
  })

  return {
    title: game ? `${game.title} - LudoLex` : 'Game Details - LudoLex',
    description: game?.description ? stripHtml(game.description) : 'View game details, screenshots, and more',
  }
}

export default async function GamePage({ params }: GamePageProps) {
  // Check cache first
  const [cachedGame] = await getCachedGames({
    where: { slug: params.slug },
    limit: 1,
  })

  if (!cachedGame) {
    // Fetch and cache if not found
    const gameData = await getGame(params.slug)
    if (!gameData) {
      notFound()
    }
  }

  return (
    <div className="min-w-0 pt-[1.5%]">
      <GameMediaSection slug={params.slug} />
    </div>
  )
}