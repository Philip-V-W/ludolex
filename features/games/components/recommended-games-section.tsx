'use client'

import { useEffect, useState } from 'react'
import GameGrid from '@/components/shared/game-card-grid'
import { RecommendedGame } from '@/components/shared/game-card'

export default function RecommendedGamesSection() {
  const [recommendedGames, setRecommendedGames] = useState<RecommendedGame[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecommendedGames = async () => {
      try {
        const response = await fetch('/api/games/recommended-games')
        const result = await response.json()

        if (result.success && result.data) {
          setRecommendedGames(result.data)
        } else {
          setError(result.error || 'Failed to load games')
        }
      } catch (err) {
        console.error('Fetch error:', err)
        setError('Failed to load games')
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendedGames()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <section className="relative w-full min-w-0 max-w-[1920px] mt-[3%]">
      <GameGrid
        title="Recommended Games"
        games={recommendedGames}
      />
    </section>
  )
}