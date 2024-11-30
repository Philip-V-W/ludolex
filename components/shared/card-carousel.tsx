'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { PlatformInfo } from '@/features/games/utils/platforms'
import Link from 'next/link'
import { PlatformIcons } from '@/components/shared/platform-icons'

export type TopRated = {
  id: string
  title: string
  slug: string
  mainImage: string
  score: number
  platforms: PlatformInfo[]
}

type CarouselProps = {
  games: TopRated[]
  options?: EmblaOptionsType
  className?: string
}

// Navigation Buttons Hook
const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

// Game Card Component
const GameCard: React.FC<{ game: TopRated }> = ({ game }) => {
  // Ignore platforms filter without a name
  const validPlatforms = game.platforms.filter(platform =>
    platform.name && true,
  )
  return (
    <Link href={`/games/${game.slug}`} className="block w-full hover:opacity-95 transition-opacity">
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-lg sm:rounded-xl md:rounded-1xl lg:rounded-2xl bg-bg-nav hover:scale-105 transition-transform">
        <Image
          src={game.mainImage || '/placeholder.png'}
          alt={game.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Title and platforms */}
        <div className="absolute bottom-0 left-0 right-0 p-[5%]">
          <h3 className="fluid-max-16 font-semibold text-text-primary mb-[2%]">{game.title}</h3>
          <div className="flex items-center gap-[2%]">
            {validPlatforms.map((platform, idx) => (
              <PlatformIcons key={idx} platform={platform} />
            ))}
          </div>
        </div>

        {/* Score */}
        <div
          className="absolute bottom-[5%] right-[5%] bg-rating-success rounded-full w-[12%] aspect-square flex items-center justify-center">
          <span className="fluid-max-14 font-medium text-text-primary">{game.score}</span>
        </div>
      </div>
    </Link>
  )
}

// Main Carousel Component
const CardCarousel: React.FC<CarouselProps> = (props) => {
  const { games, options, className } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: 'trimSnaps',
    dragFree: false,
    skipSnaps: false,
    ...options,
  })

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  return (
    <div className={cn('w-[100%] max-w-[1920px] mx-auto relative', className)}
         style={{ minWidth: '0' }}>
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-lg sm:rounded-xl md:rounded-1xl lg:rounded-2xl w-full"
           style={{ minWidth: '0' }} ref={emblaRef}>
        <div className="flex gap-[1%]" style={{ minWidth: '0' }}>
          {games.map((game) => (
            <div key={game.id} className="flex-[0_0_19%]" style={{ minWidth: '0' }}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        className={cn(
          'absolute top-1/2 -translate-y-1/2 z-10 left-[-2.5%]',
          'flex items-center justify-center',
          'transition-all duration-300 w-[2.5%] aspect-square',
          'hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]',
          'disabled:opacity-30 disabled:hover:scale-100 disabled:hover:drop-shadow-none',
        )}
      >
        <svg className="w-full h-full text-text-primary" viewBox="0 0 532 532">
          <path
            fill="currentColor"
            d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
          />
        </svg>
      </button>
      <button
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        className={cn(
          'absolute top-1/2 -translate-y-1/2 z-10 right-[-2.5%]',
          'flex items-center justify-center',
          'transition-all duration-300 w-[2.5%] aspect-square',
          'hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]',
          'disabled:opacity-30 disabled:hover:scale-100 disabled:hover:drop-shadow-none',
        )}
      >
        <svg className="w-full h-full text-text-primary" viewBox="0 0 532 532">
          <path
            fill="currentColor"
            d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0-9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
          />
        </svg>
      </button>
    </div>
  )
}

export default CardCarousel