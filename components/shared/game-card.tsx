'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type GameCardProps = {
  id: string
  title: string
  image: string
  releaseDate: string
  platforms: string[]
  score?: number
  hasVideo?: boolean
  className?: string
}

const GameCard = ({
                    title,
                    image,
                    releaseDate,
                    platforms,
                    score,
                    hasVideo = false,
                    className,
                  }: GameCardProps) => {
  const [isLibraryHovered, setIsLibraryHovered] = useState(false)
  const [isWishlistHovered, setIsWishlistHovered] = useState(false)

  return (
    <div
      className={cn(
        'group relative w-full overflow-hidden rounded-lg bg-bg-nav',
        'transition-transform flex flex-col',
        className,
      )}
    >
      {/* Image Section */}
      <div className="relative aspect-[16/9]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-3"> {/* Added flex-1 */}
        <div className="flex justify-between mb-auto"> {/* Changed to flex and added mb-auto */}
          <div className="space-y-2">
            {/* Platform Icons */}
            <div className="flex gap-2">
              {platforms.map((platform, idx) => (
                <Image
                  key={idx}
                  src={`/platform_icons/${platform}.svg`}
                  alt={platform}
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              ))}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-text-primary leading-tight">
              {title}
            </h3>

            {/* Release Date */}
            <p className="text-sm text-text-primary">
              Release Date: {releaseDate}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-end">
            <button
              className="transition-colors"
              onMouseEnter={() => setIsLibraryHovered(true)}
              onMouseLeave={() => setIsLibraryHovered(false)}
            >
              <Image
                src={isLibraryHovered
                  ? '/sidebar/My Library/Property 1=Variant2.svg'
                  : '/sidebar/My Library/Property 1=Default.svg'
                }
                alt="Add to Library"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </button>
            <button
              className="transition-colors mt-2"
              onMouseEnter={() => setIsWishlistHovered(true)}
              onMouseLeave={() => setIsWishlistHovered(false)}
            >
              <Image
                src={isWishlistHovered
                  ? '/sidebar/Wishlist/Property 1=Variant2.svg'
                  : '/sidebar/Wishlist/Property 1=Default.svg'
                }
                alt="Add to Wishlist"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>

        {/* Score Bar */}
        {score && (
          <div className="h-1 w-full overflow-hidden rounded-full bg-accent-primary mt-3">
            <div
              className={cn(
                'h-full transition-all',
                score >= 80 ? 'bg-rating-success' :
                  score >= 60 ? 'bg-rating-warning' :
                    'bg-rating-error',
              )}
              style={{ width: `${score}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default GameCard