import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export type MediaType = {
  id: string
  type: 'video' | 'image'
  url: string
  thumbnail?: string
}

interface GameMediaCarouselProps {
  initialMedia: MediaType[]
  options?: EmblaOptionsType
  className?: string
}

// MediaSlide Component
const MediaSlide: React.FC<{ item: MediaType }> = ({ item }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="relative flex-[0_0_100%] min-w-0">
      <div className="relative w-full aspect-video">
        {item.type === 'video' ? (
          <>
            <video
              src={item.url}
              poster={item.thumbnail}
              className="h-full w-full object-cover"
              controls={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            {!isPlaying && (
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                          flex items-center justify-center rounded-full bg-black/50
                          p-[3%] transition-all hover:scale-110 hover:bg-black/70"
              >
                <Play className="h-full w-full text-text-primary" />
              </button>
            )}
          </>
        ) : (
          <Image
            src={item.url}
            alt="Game media"
            fill
            className="object-cover"
            priority={true}
          />
        )}
      </div>
    </div>
  )
}

// Thumbnail Component
const Thumbnail: React.FC<{
  item: MediaType
  isSelected: boolean
  onClick: () => void
}> = ({ item, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative overflow-hidden transition-all',
        'hover:ring-1 hover:ring-text-primary',
        'shrink-0 w-[19.2%]',
        isSelected && 'ring-2 ring-accent-primary',
      )}
      style={{ minWidth: '0' }}
    >
      <div className="relative aspect-video w-full">
        <Image
          src={item.type === 'video' ? item.thumbnail || item.url : item.url}
          alt="Thumbnail"
          fill
          className="object-cover"
        />
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Play className="h-[15%] w-[15%] text-text-primary" />
          </div>
        )}
      </div>
    </button>
  )
}

export default function GameMediaCarousel({
                                            initialMedia,
                                            options,
                                            className,
                                          }: GameMediaCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mainRef, mainApi] = useEmblaCarousel({
    ...options,
    loop: true,
    containScroll: 'trimSnaps',
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi) return
      mainApi.scrollTo(index)
      setSelectedIndex(index)
    },
    [mainApi],
  )

  const onSelect = useCallback(() => {
    if (!mainApi) return
    setSelectedIndex(mainApi.selectedScrollSnap())
  }, [mainApi])

  useEffect(() => {
    if (!mainApi) return
    onSelect()
    mainApi.on('select', onSelect)
    mainApi.on('reInit', onSelect)
    return () => {
      mainApi.off('select', onSelect)
      mainApi.off('reInit', onSelect)
    }
  }, [mainApi, onSelect])

  return (
    <div className={cn('w-[100%] max-w-[1920px] mx-auto relative', className)} style={{ minWidth: '0' }}>
      {/* Main carousel */}
      <div
        className="overflow-hidden w-full"
        style={{ minWidth: '0' }}
        ref={mainRef}
      >
        <div className="flex w-full" style={{ minWidth: '0' }}>
          {initialMedia.map((item) => (
            <div className="flex-[0_0_100%] w-full" style={{ minWidth: '0' }} key={item.id}>
              <MediaSlide key={item.id} item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <ScrollArea className="w-full whitespace-nowrap mt-[1%]" style={{ minWidth: '0' }}>
        <div className="flex gap-[1%] pb-[1.5%] w-full" style={{ minWidth: '0' }}>
          {initialMedia.slice(1).map((item, index) => (
            <Thumbnail
              key={item.id}
              item={item}
              isSelected={index + 1 === selectedIndex}
              onClick={() => onThumbClick(index + 1)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}