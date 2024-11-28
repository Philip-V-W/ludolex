export function GameDetails({ game }) {
  return (
    <div className="bg-bg-nav rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-2">Platforms</h3>
          <div className="space-y-1 text-text-secondary">
            {game.platforms.map((platform) => (
              <div key={platform}>{platform}</div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Release date</h3>
          <div className="text-text-secondary">{game.releaseDate}</div>

          <h3 className="font-medium mb-2 mt-4">Publishers</h3>
          <div className="space-y-1 text-text-secondary">
            {game.publishers.map((publisher) => (
              <div key={publisher}>{publisher}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}