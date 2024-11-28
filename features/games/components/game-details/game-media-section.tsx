'use client'

import { useState, useEffect } from 'react'
import GameMediaCarousel from './game-media-carousel'

interface GameData {
  success: boolean
  data: {
    id: string
    title: string
    mainImage: string
    screenshots: string[]
    previewVideoUrl: string | null
    fullVideoUrl: string | null
    videoPreview: string | null
  }
  error?: string
}

interface MediaItem {
  id: string
  type: 'video' | 'image'
  url: string
  thumbnail?: string
  title?: string
}

interface GameMediaSectionProps {
  slug: string
}

export default function GameMediaSection({ slug }: GameMediaSectionProps) {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGameMedia = async () => {
      try {
        const response = await fetch(`/api/games/${slug}`)
        const result = await response.json() as GameData

        if (!result.success) {
          throw new Error(result.error || 'Failed to load game media')
        }

        const { data } = result
        const mediaItems: MediaItem[] = []

        // Add video if exists
        if (data.fullVideoUrl) {
          mediaItems.push({
            id: 'video-main',
            type: 'video',
            url: data.fullVideoUrl,
            thumbnail: data.videoPreview || data.mainImage,
            title: data.title,
          })
        }

        // Add main image if not used as video thumbnail
        if (data.mainImage && (!data.fullVideoUrl || data.videoPreview)) {
          mediaItems.push({
            id: 'image-main',
            type: 'image',
            url: data.mainImage,
            title: data.title,
          })
        }

        // Add screenshots
        if (data.screenshots?.length) {
          data.screenshots.forEach((url, index) => {
            mediaItems.push({
              id: `image-${index}`,
              type: 'image',
              url,
              title: data.title,
            })
          })
        }

        setMedia(mediaItems)
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load game media')
      } finally {
        setLoading(false)
      }
    }

    fetchGameMedia()
  }, [slug])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!media.length) return null

  return (
    <section className="relative w-full min-w-0 max-w-[1920px] mt-[-1%]">
      <div className="flex items-center gap-2 fluid-max-16 text-text-secondary mb-4">
        <a href="/games" className="hover:text-text-primary transition-colors">
          Games
        </a>
        <span>/</span>
        <span className="text-text-primary">{slug.charAt(0).toUpperCase() + slug.slice(1)}</span>
      </div>
      <h1 className="fluid-max-48 text-text-primary font-semibold">
        {media.length > 0 ? media[0]?.title : 'Game Title'}
      </h1>
      <GameMediaCarousel initialMedia={media} />
    </section>
  )
}