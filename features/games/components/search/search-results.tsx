import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSearchStore } from '@/features/games/stores/searchStore'

// Absolute image URLs helper
const ensureAbsoluteUrl = (url: string) => {
  if (url.startsWith('//')) {
    return `https:${url}`
  }
  return url
}

export const SearchResults = () => {
  const { results, isLoading, isOpen, error, clearSearch } = useSearchStore()

  if (!isOpen) return null

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
            {results.map((game) => (
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
          </div>
        )}
      </ScrollArea>
    </div>
  )
}