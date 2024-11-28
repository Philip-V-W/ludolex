'use client'

import { useEffect, useState } from 'react'
import EmblaCarousel from '@/components/shared/hero-carousel'
import type { CarouselGame } from '@/components/shared/hero-carousel'

export default function TrendingSection() {
  const [trendingGames, setTrendingGames] = useState<CarouselGame[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrendingGames = async () => {
      try {
        const response = await fetch('/api/games/trending')
        const result = await response.json()

        if (result.success && result.data) {
          setTrendingGames(result.data)
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

    fetchTrendingGames()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <section className="relative w-full min-w-0 max-w-[1920px] mt-[-1%]">
      <h1 className="fluid-max-48 text-text-primary font-semibold pl-[5%]">
        New and Trending
      </h1>
      <EmblaCarousel
        games={trendingGames}
        options={{
          align: 'start',
          loop: true,
        }}
      />
    </section>
  )
}