import { Metadata } from 'next'
import { getCachedGames } from '@/lib/api/services/cache'
import { stripHtml } from '@/lib/utils'
import GameMediaSection from '@/features/games/components/game-details/game-media-section'
import GameDetailsSection from '@/features/games/components/game-details/game-details-section'
import GameSideDetails from '@/features/games/components/game-details/game-side-details-section'
import GameReqDetails from '@/features/games/components/game-details/game-system-req-section'

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
  return (
    <div className="min-w-0">
      <GameMediaSection slug={params.slug} />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <GameDetailsSection slug={params.slug} />
          <GameReqDetails slug={params.slug} />
        </div>
        <GameSideDetails slug={params.slug} />
      </div>
    </div>
  )
}