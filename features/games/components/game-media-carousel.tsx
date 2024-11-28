// features/games/components/game-media-carousel.tsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { GameMedia } from '@/features/games/types'

interface GameMediaCarouselProps {
  media: GameMedia[]
  className?: string
}

export function GameMediaCarousel({ media, className }: GameMediaCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const activeMedia = media[selectedIndex]

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Display */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-bg-nav">
        {activeMedia.type === 'video' ? (
          <>
            {!isPlaying ? (
              <div
                className="relative h-full w-full cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                <Image
                  src={activeMedia.thumbnail}
                  alt={activeMedia.title || 'Video thumbnail'}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-black/50 p-4 transition-transform hover:scale-110">
                    <Play className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white" />
                  </div>
                </div>
              </div>
            ) : (
              <video
                src={activeMedia.url}
                className="h-full w-full"
                controls
                autoPlay
                onEnded={() => setIsPlaying(false)}
              />
            )}
          </>
        ) : (
          <Image
            src={activeMedia.url}
            alt={activeMedia.title || 'Game screenshot'}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* TODO: fix scrollbar disappearing */}
      {/* Thumbnails ScrollArea */}
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-4 p-4">
          {media.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedIndex(index)
                setIsPlaying(false)
              }}
              className={cn(
                "shrink-0",
                "w-[140px] xs:w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]",
                "relative aspect-video overflow-hidden rounded",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary",
                "transition-all duration-200",
                selectedIndex === index
                  ? "ring-2 ring-text-primary"
                  : "hover:ring-2 hover:ring-text-primary/50",
                "bg-bg-nav"
              )}
            >
              <Image
                src={item.thumbnail}
                alt={item.title || `Media ${index + 1}`}
                fill
                className="object-cover"
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                </div>
              )}
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2">
                  <p className="text-xs sm:text-sm text-text-primary line-clamp-1">
                    {item.title}
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}