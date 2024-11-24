'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type Game = {
  id: string
  title: string
  image: string
  score: number
  platforms: string[]
}

type CarouselProps = {
  games: Game[]
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
const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  return (
    <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-bg-nav hover:scale-105 transition-transform">
      <Image
        src={game.image}
        alt={game.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Title and platforms */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-2">{game.title}</h3>
        <div className="flex items-center gap-2">
          {game.platforms.map((platform, idx) => (
            <Image
              key={idx}
              src={`/platform_icons/${platform}`}
              alt={platform}
              width={16}
              height={16}
              className="w-4 h-4"
            />
          ))}
        </div>
      </div>

      {/* Score */}
      <div className="absolute bottom-2 right-2 bg-rating-success rounded-full px-2 py-1">
        <span className="text-sm font-bold text-text-primary">{game.score}</span>
      </div>
    </div>
  )
}

// Main Carousel Component
const CardCarousel: React.FC<CarouselProps> = (props) => {
  const { games, options, className } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 5,
    containScroll: 'trimSnaps',
    ...options,
  })

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  return (
    <div className={cn('relative mx-auto', className)}>
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="flex-[0_0_19%]"
            >
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons - Repositioned */}
      <button
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        className={cn(
          'absolute -left-12 top-1/2 -translate-y-1/2',
          'flex items-center justify-center',
          'transition-all duration-300',
          'hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]',
          'disabled:opacity-30 disabled:hover:scale-100 disabled:hover:drop-shadow-none',
        )}
      >
        <svg className="w-8 h-8 text-text-primary" viewBox="0 0 532 532">
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
          'absolute -right-12 top-1/2 -translate-y-1/2',
          'flex items-center justify-center',
          'transition-all duration-300',
          'hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]',
          'disabled:opacity-30 disabled:hover:scale-100 disabled:hover:drop-shadow-none',
        )}
      >
        <svg className="w-8 h-8 text-text-primary" viewBox="0 0 532 532">
          <path
            fill="currentColor"
            d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
          />
        </svg>
      </button>
    </div>
  )
}

export default CardCarousel