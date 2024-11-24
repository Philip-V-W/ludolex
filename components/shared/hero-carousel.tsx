'use client'

import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export type Game = {
  id: string
  title: string
  description: string
  mainImage: string
  thumbnails: string[]
  platforms: string[]
  genres: string[]
  score: number
}

type CarouselProps = {
  games: Game[]
  options?: EmblaOptionsType
  className?: string
}

// Rectangle Indicator Button Hook
const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
      if (onButtonClick) onButtonClick(emblaApi)
    },
    [emblaApi, onButtonClick],
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  }
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

// Previous Button Components
const PrevButton: React.FC<ComponentPropsWithRef<'button'>> = (props) => {
  const { children, className, disabled, ...restProps } = props

  return (
    <button
      className={cn(
        'absolute left-5 top-1/2 -translate-y-1/2 z-10',
        'flex items-center justify-center',
        'transition-all duration-300',
        'hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]',
        'disabled:opacity-30 disabled:hover:scale-100 disabled:hover:drop-shadow-none',
        className,
      )}
      disabled={disabled}
      type="button"
      {...restProps}
    >
      <svg className="w-8 h-8 text-text-primary" viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
        />
      </svg>
      {children}
    </button>
  )
}

// Next Button Components
const NextButton: React.FC<ComponentPropsWithRef<'button'>> = (props) => {
  const { children, className, disabled, ...restProps } = props

  return (
    <button
      className={cn(
        'absolute right-5 top-1/2 -translate-y-1/2 z-10',
        'flex items-center justify-center',
        'transition-all duration-300',
        'hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]',
        'disabled:opacity-30 disabled:hover:scale-100 disabled:hover:drop-shadow-none',
        className,
      )}
      disabled={disabled}
      type="button"
      {...restProps}
    >
      <svg className="w-8 h-8 text-text-primary" viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
        />
      </svg>
      {children}
    </button>
  )
}

// Rectangle Indicator Button Components
const DotButton: React.FC<ComponentPropsWithRef<'button'> & { isFirst?: boolean; isLast?: boolean }> = (props) => {
  const { children, className, isFirst, isLast, ...restProps } = props

  return (
    <button
      className={cn(
        'h-[8px] w-8 p-0 focus:outline-none transition-all duration-300',
        className?.includes('--selected')
          ? 'bg-text-primary opacity-100'
          : 'bg-text-primary opacity-30',
        isFirst && 'rounded-l-sm',
        isLast && 'rounded-r-sm',
      )}
      type="button"
      {...restProps}
    >
      {children}
    </button>
  )
}

const GameSlide: React.FC<{ game: Game }> = ({ game }) => {
  const [activeImage, setActiveImage] = useState(game.mainImage)

  return (
    <div className="grid grid-cols-[1.5fr_1fr]">
      {/* Left side - Main image/video */}
      <div className="relative aspect-[16/9] rounded-s-3xl">
        <Image
          src={activeImage}
          alt={game.title}
          fill
          className="object-cover"
          priority
        />
        {/* Title and Platform container - positioned at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            {game.title}
          </h2>
          {/* Platform icons */}
          <div className="flex gap-2">
            {game.platforms.map((platform, idx) => (
              <Image
                key={idx}
                src={`/platform_icons/${platform}`}
                alt={`Platform icon ${idx + 1}`}
                width={24}
                height={24}
                className="h-5 w-5"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Info */
      }
      <div className="flex flex-col space-y-4 bg-bg-nav p-8">
        {/* Thumbnails */}
        <div className="grid grid-cols-2 gap-2">
          {game.thumbnails.map((thumb, idx) => (
            <button
              key={idx}
              className="relative aspect-video overflow-hidden
                         hover:ring-2 hover:ring-text-primary transition-all"
              onMouseEnter={() => setActiveImage(thumb)}
              onMouseLeave={() => setActiveImage(game.mainImage)}
            >
              <Image
                src={thumb}
                alt={`${game.title} screenshot ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Description */}
        <div>
          <p className="mt-2 text-sm text-text-primary line-clamp-3">
            {game.description}
          </p>
        </div>

        {/* Score Bar */}
        <div className="space-y-1">
          <div className="h-2 w-full rounded-full bg-accent-primary">
            <div
              className="h-full rounded-full bg-rating-success transition-all"
              style={{ width: `${game.score}%` }}
            />
          </div>
        </div>

        {/* Genre tags */}
        <div className="flex flex-wrap gap-2">
          {game.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-full bg-accent-primary px-3 py-1 text-sm text-text-primary"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main Carousel Component
const EmblaCarousel: React.FC<CarouselProps> = (props) => {
  const { games, options, className } = props

  // TODO: change delay value when finished
  const autoplayOptions = {
    delay: 25000000,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      ...options,
      loop: true,
    },
    [Autoplay(autoplayOptions)],
  )

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick,
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  return (
    <div className={cn('relative mx-auto max-w-[1400px] px-16', className)}>
      <div className="overflow-hidden rounded-[1.8rem]" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4">
          {Array.isArray(games) && games.map((game) => (

            <div
              className="min-w-0 flex-[0_0_100%] pl-4"
              key={game.id}
            >
              <GameSlide game={game} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />

      {/* Rectangle Indicators */}
      <div className="mt-4 flex justify-center items-center gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            isFirst={index === 0}
            isLast={index === scrollSnaps.length - 1}
            className={cn(
              'embla__dot',
              index === selectedIndex && 'embla__dot--selected',
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default EmblaCarousel