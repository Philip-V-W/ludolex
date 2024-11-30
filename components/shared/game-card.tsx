'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export type RecommendedGame = {
  id: string
  title: string
  slug: string
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
                    slug,
                    releaseDate,
                    platforms,
                    score,
                    hasVideo = false,
                    className,
                  }: RecommendedGame) => {
  const [isLibraryHovered, setIsLibraryHovered] = useState(false)
  const [isWishlistHovered, setIsWishlistHovered] = useState(false)

  return (
    <Link href={`/games/${slug}`} className="block w-full hover:opacity-95 transition-opacity">
      <div
        className={cn(
          'group relative w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-1xl lg:rounded-2xl bg-bg-nav mb-[5%]',
          'hover:scale-105 transition-transform flex flex-col',
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
        <div className="flex flex-col flex-1 p-[7%]">
          <div className="flex justify-between mb-auto">
            <div className="space-y-[4%]">
              {/* Platform Icons */}
              <div className="flex gap-[4%]">
                {platforms.map((platform, idx) => (
                  <div key={idx} className="w-[9%] aspect-square relative">
                    <Image
                      src={`/platform_icons/${platform}.svg`}
                      alt={platform}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Title */}
              <h3 className="fluid-max-20 font-semibold text-text-primary leading-tight">
                {title}
              </h3>

              {/* Release Date */}
              <p className="fluid-max-14 text-text-primary">
                Release Date: {releaseDate}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-end gap-[8%]">
              <button
                className="transition-colors w-[24%] aspect-square relative"
                onMouseEnter={() => setIsLibraryHovered(true)}
                onMouseLeave={() => setIsLibraryHovered(false)}
              >
                <Image
                  src={isLibraryHovered
                    ? '/sidebar/My Library/Property 1=Variant2.svg'
                    : '/sidebar/My Library/Property 1=Default.svg'
                  }
                  alt="Add to Library"
                  fill
                  className="object-contain"
                />
              </button>
              <button
                className="transition-colors w-[24%] aspect-square relative"
                onMouseEnter={() => setIsWishlistHovered(true)}
                onMouseLeave={() => setIsWishlistHovered(false)}
              >
                <Image
                  src={isWishlistHovered
                    ? '/sidebar/Wishlist/Property 1=Variant2.svg'
                    : '/sidebar/Wishlist/Property 1=Default.svg'
                  }
                  alt="Add to Wishlist"
                  fill
                  className="object-contain"
                />
              </button>
            </div>
          </div>

          {/* Score Bar */}
          {score && (
            <div className="h-[0.4cqw] w-full overflow-hidden rounded-full bg-accent-primary mt-[4%]">
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
    </Link>
  )
}

export default GameCard