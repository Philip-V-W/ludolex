'use client'

import { useState, useEffect } from 'react'
import { stripHtml } from '@/lib/utils'

interface GameData {
  success: boolean
  data: {
    id: string
    title: string
    description: string
    genres: string[]
    platforms: { name: string; slug: string }[]
    tags: string[]
  }
  error?: string
}

interface GameDetailsSectionProps {
  slug: string
}

export default function GameDetailsSection({ slug }: GameDetailsSectionProps) {
  const [gameData, setGameData] = useState<GameData['data'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`/api/games/${slug}`)
        const result = await response.json() as GameData

        if (!result.success) {
          throw new Error(result.error || 'Failed to load game details')
        }

        setGameData(result.data)
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load game details')
      } finally {
        setLoading(false)
      }
    }

    fetchGameDetails()
  }, [slug])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!gameData) return null

  const renderList = (items: string[]) => (
    <div className="text-text-primary">
      {items?.length ? items.join(', ') : 'N/A'}
    </div>
  )

  return (
    <div className="space-y-6 bg-bg-nav p-6 rounded-xl">
      <div>
        <h2 className="fluid-max-32 font-bold text-text-primary mb-4">
          About {gameData.title}
        </h2>
        <p className="text-text-primary fluid-max-16 leading-relaxed">
          {stripHtml(gameData.description)}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="fluid-max-18 font-semibold text-text-muted mb-2">
            Genre:
          </h3>
          <p className="text-text-primary fluid-max-16 leading-relaxed">
            {renderList(gameData.genres)}
          </p>
        </div>

        <div>
          <h3 className="fluid-max-18 font-semibold text-text-muted mb-2">
            Platforms:
          </h3>
          <p className="text-text-primary fluid-max-16 leading-relaxed">
            {renderList(gameData.platforms.map(p => p.name))}
          </p>
        </div>

        {/* TODO: fix tag fetching */}
        <div>
          <h3 className="fluid-max-18 font-semibold text-text-muted mb-2">
            Tags:
          </h3>
          <p className="text-text-primary fluid-max-16 leading-relaxed">
            {renderList(gameData.tags)}
          </p>
        </div>
      </div>
    </div>
  )
}