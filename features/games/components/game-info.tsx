export function GameInfo({ game }) {
  return (
    <div className="bg-bg-nav rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">About {game.title}</h2>
      <p className="text-text-secondary whitespace-pre-line">{game.description}</p>

      <div className="mt-6 space-y-4">
        <div>
          <h3 className="font-medium mb-2">Genre</h3>
          <div className="flex flex-wrap gap-2">
            {game.genres.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 bg-bg-dark rounded-full text-sm text-text-secondary"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-bg-dark rounded-full text-sm text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}