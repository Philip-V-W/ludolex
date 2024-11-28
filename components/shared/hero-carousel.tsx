'use client'

import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { decodeHTMLEntities } from '@/lib/utils/textHelpers'

// TODO: place these in the correct location and add more platforms
export const PLATFORM_SLUG_MAP: Record<string, string> = {
  'PlayStation 5': 'playstation5',
  'PlayStation 4': 'playstation4',
  'Xbox One': 'xbox-one',
  'Xbox Series S/X': 'xbox-series-x',
  'PC': 'pc',
  'Nintendo Switch': 'nintendo-switch',
  'iOS': 'ios',
  'Android': 'android',
}

export type PlatformInfo = {
  name: string;
  slug: string;
}

export type CarouselGame = {
  id: string
  title: string
  description: string
  mainImage: string
  thumbnails: string[]
  platforms: PlatformInfo[]
  genres: string[]
  score: number
}

type CarouselProps = {
  games: CarouselGame[]
  options?: EmblaOptionsType
  className?: string
}

export function getPlatformIconSlug(platformName: string): string {
  return PLATFORM_SLUG_MAP[platformName]
}

// Previous Button Component
const PrevButton: React.FC<ComponentPropsWithRef<'button'>> = (props) => {
  const { children, className, disabled, ...restProps } = props

  return (
    <button
      className={cn(
        'absolute top-1/2 -translate-y-1/2 z-10',
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
      <svg className="w-full h-full text-text-primary" viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
        />
      </svg>
      {children}
    </button>
  )
}

// Next Button Component
const NextButton: React.FC<ComponentPropsWithRef<'button'>> = (props) => {
  const { children, className, disabled, ...restProps } = props

  return (
    <button
      className={cn(
        'absolute top-1/2 -translate-y-1/2 z-10',
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
      <svg className="w-full h-full text-text-primary" viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
        />
      </svg>
      {children}
    </button>
  )
}

// Dot Button Component
const DotButton: React.FC<ComponentPropsWithRef<'button'> & { isFirst?: boolean; isLast?: boolean }> = (props) => {
  const { children, className, isFirst, isLast, ...restProps } = props

  return (
    <button
      className={cn(
        'h-[0.5cqw] w-[3%] focus:outline-none transition-all duration-300',
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

const GameSlide: React.FC<{ game: CarouselGame }> = ({ game }) => {
  const [activeImage, setActiveImage] = useState(game.mainImage)


  return (
    <div className="relative flex w-full h-auto" style={{ minWidth: '0' }}>
      <div className="flex w-full aspect-[25/10]">
        {/* Left side - Main image (66.66%) */}
        <div className="relative w-[66.66%]" style={{ minWidth: '0' }}>
          <Image
            src={activeImage}
            alt={game.title}
            fill
            className="object-cover"
            priority
          />
          {/* Title and Platform container */}
          <div
            className="absolute bottom-0 left-0 right-0 p-[5%] bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <h2 className="fluid-max-32 font-bold text-text-primary mb-[1%] truncate">
              {game.title}
            </h2>
            {/* Platform icons */}

            <div className="flex gap-[1%]">
              {game.platforms.map((platform: PlatformInfo, idx) => (
                <div key={idx} className="w-[2.5%] aspect-square relative">
                  <Image
                    src={`/platform_icons/${getPlatformIconSlug(platform.name)}.svg`}
                    alt={platform.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Info (33.33%) */}
        <div className="relative w-[33.33%] flex flex-col bg-bg-nav p-[3%]" style={{ minWidth: '0' }}>
          {/* Thumbnails */}
          <div className="grid grid-cols-2 gap-[7%2%]">
            {game.thumbnails.slice(0, 4).map((thumb, idx) => (
              <button
                key={idx}
                className="relative aspect-video overflow-hidden hover:ring-1 hover:ring-text-primary transition-all"
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
          <div className="mt-[7%]">
            <p className="fluid-max-14 text-text-primary line-clamp-4">
              {decodeHTMLEntities(game.description)}
            </p>
          </div>

          {/* Score Bar */}
          <div className="mt-[5%]">
            <div className="h-[0.4cqw] w-full rounded-full bg-accent-primary">
              <div
                className="h-full rounded-full bg-rating-success transition-all"
                style={{ width: `${game.score}%` }}
              />
            </div>
          </div>

          {/* Genre tags */}
          <div className="flex flex-wrap justify-center gap-[2%] mt-[5%] overflow-hidden">
            {game.genres.slice(0, 10).map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-accent-primary px-[3%] py-[1%] mb-[3%] fluid-max-12 text-text-primary whitespace-nowrap"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
const EmblaCarousel: React.FC<CarouselProps> = (props) => {
  const { games, options, className } = props

  const autoplayOptions = {
    delay: 4000,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      ...options,
      loop: true,
      containScroll: 'trimSnaps',
      dragFree: false,
      align: 'center',
      skipSnaps: false,
    },
    [Autoplay(autoplayOptions)],
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <div className={cn(
      'w-[100%] max-w-[1920px] mx-auto relative',
      className,
    )} style={{ minWidth: '0' }}>
      <div
        className="overflow-hidden w-full rounded-3xl sm:rounded-4xl md:rounded-5xl lg:rounded-6xl"
        style={{ minWidth: '0' }}
        ref={emblaRef}
      >
        <div className="flex w-full" style={{ minWidth: '0' }}>
          {Array.isArray(games) &&
            games.map((game) => (
              <div className="flex-[0_0_100%] w-full" style={{ minWidth: '0' }} key={game.id}>
                <GameSlide game={game} />
              </div>
            ))}
        </div>
      </div>

      <PrevButton
        onClick={() => {
          emblaApi?.scrollPrev()
          onNavButtonClick(emblaApi!)
        }}
        disabled={prevBtnDisabled}
        className="left-[-3.5%] w-[3.5%] aspect-square"
      />
      <NextButton
        onClick={() => {
          emblaApi?.scrollNext()
          onNavButtonClick(emblaApi!)
        }}
        disabled={nextBtnDisabled}
        className="right-[-3.5%] w-[3.5%] aspect-square"
      />

      <div className="mt-[1.25%] flex justify-center items-center gap-[0.5%]">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => {
              scrollTo(index)
              onNavButtonClick(emblaApi!)
            }}
            isFirst={index === 0}
            isLast={index === scrollSnaps.length - 1}
            className={cn(
              'w-[4%]',
              index === selectedIndex && 'embla__dot--selected',
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default EmblaCarousel