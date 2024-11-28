import Image from 'next/image'
import { Game } from '../types'

interface GameDetailsPageProps {
  game: Game
}

export function GameDetailsPage({ game }: GameDetailsPageProps) {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative h-[500px] rounded-lg overflow-hidden">
        <Image
          src={game.backgroundImage}
          alt={game.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent" />

        <div className="absolute bottom-0 w-full p-6">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white">{game.title}</h1>
              <div className="flex items-center gap-4 text-text-secondary">
                {game.metacritic && (
                  <span className="bg-rating-success px-2 py-1 rounded">
                    {game.metacritic}
                  </span>
                )}
                <span>{game.releaseDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-bg-nav rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">About {game.title}</h2>
            <p className="text-text-secondary">{game.description}</p>
          </div>

          <div className="bg-bg-nav rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Details</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <dt className="font-medium mb-2">Platforms</dt>
                <dd className="text-text-secondary">
                  {game.platforms.map(p => p.name).join(', ')}
                </dd>
              </div>
              <div>
                <dt className="font-medium mb-2">Release date</dt>
                <dd className="text-text-secondary">{game.releaseDate}</dd>
              </div>
              <div>
                <dt className="font-medium mb-2">Publisher</dt>
                <dd className="text-text-secondary">{game.publishers.join(', ')}</dd>
              </div>
              <div>
                <dt className="font-medium mb-2">Developer</dt>
                <dd className="text-text-secondary">{game.developers.join(', ')}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-bg-nav rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Where to buy</h2>
            <div className="flex flex-wrap gap-4">
              {game.stores.map((store) => (
                <a
                  key={store.id}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={store.icon}
                    alt={store.name}
                    width={32}
                    height={32}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-bg-nav rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Age Ratings</h2>
            <div className="flex flex-wrap gap-4">
              {game.ageRatings.map((rating) => (
                <div key={rating.system} className="text-center">
                  <Image
                    src={rating.icon}
                    alt={`${rating.system} Rating: ${rating.rating}`}
                    width={48}
                    height={48}
                  />
                  <div className="text-sm text-text-secondary mt-1">
                    {rating.system}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}