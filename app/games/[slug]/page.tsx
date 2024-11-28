import { Metadata } from 'next'
import { getGameBySlug } from '@/lib/api/games'
import { GameHero } from '@/features/games/components/game-hero'
import { GameInfo } from '@/features/games/components/game-info'
import { GameDetails } from '@/features/games/components/game-details'
import { GameRequirements } from '@/features/games/components/game-requirements'

import { notFound } from 'next/navigation'

interface GamePageProps {
  params: {
    slug: string
  }
}

// TODO: change this to be dynamic based on the game data
export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const game = await getGameBySlug(params.slug)
  if (!game) return {}

  return {
    title: `${game.title} - Ludolex`,
    description: game.description,
  }
}

export default async function GamePage({ params }: GamePageProps) {
  const game = await getGameBySlug(params.slug)
  if (!game) notFound()

  return (
    <div className="flex flex-col gap-6">
      <GameHero game={game} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
        <div className="space-y-6">
          <GameInfo game={game} />
          <GameDetails game={game} />
          <GameRequirements platforms={game.platforms} />

          <div className="space-y-6 pt-6">
            <GameCarousel
              title={`More from ${game.developer}`}
              games={game.relatedGames}
            />
            <GameCarousel
              title={`More like ${game.title}`}
              games={game.similarGames}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-bg-nav rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold">Main Developers</h2>
            <div className="space-y-2">
              {game.developers.map((dev) => (
                <div key={dev} className="text-text-secondary">
                  {dev}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-bg-nav rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold">Where to buy</h2>
            <div className="flex flex-wrap gap-4">
              {game.stores.map((store) => (
                <a
                  key={store.id}
                  href={store.url}
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src={store.icon}
                    alt={store.name}
                    className="h-8 w-8"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}