import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSearchStore } from '@/features/games/stores/searchStore'

const ensureAbsoluteUrl = (url: string) => {
  if (url.startsWith('//')) {
    return `https:${url}`
  }
  return url
}

export const SearchResults = () => {
  const { results, isLoading, isOpen, error, clearSearch } = useSearchStore()
  const [showAll, setShowAll] = useState(false)

  if (!isOpen) return null

  const displayedResults = showAll ? results : results.slice(0, 5)

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg bg-bg-nav p-2 shadow-lg">
      <ScrollArea className="h-full max-h-[60vh]">
        {isLoading ? (
          <div className="p-4 text-center text-text-secondary">Loading...</div>
        ) : error ? (
          <div className="p-4 text-center text-destructive">{error}</div>
        ) : results.length === 0 ? (
          <div className="p-4 text-center text-text-secondary">No results found</div>
        ) : (
          <div className="flex flex-col gap-2">
            {displayedResults.map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.slug}`}
                className="flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-accent-primary"
                onClick={clearSearch}
              >
                <div className="relative h-16 w-28 overflow-hidden rounded-md">
                  <Image
                    src={ensureAbsoluteUrl(game.mainImage || '/placeholder.png')}
                    alt={game.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="fluid-max-16 font-medium text-text-primary">
                    {game.title}
                  </h3>
                  <div className="flex gap-2">
                    {game.platforms?.slice(0, 3).map((platform) => (
                      <span
                        key={platform.slug}
                        className="fluid-max-12 text-text-secondary"
                      >
                        {platform.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}

            {results.length > 5 && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="mt-2 w-full rounded-md bg-bg-secondary p-2 text-center text-sm text-text-primary hover:bg-bg-secondary/80 transition-colors"
              >
                Show All Results ({results.length})
              </button>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}