'use client'

import { useEffect, useState } from 'react'
import CardCarousel, { TopRated } from '@/components/shared/card-carousel'

export default function MostAnticipatedSection() {
  const [mostAnticipatedGames, setMostAnticipatedGames] = useState<TopRated[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMostAnticipatedGames = async () => {
      try {
        const response = await fetch('/api/games/most-anticipated')
        const result = await response.json()

        if (result.success && result.data) {
          setMostAnticipatedGames(result.data)
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

    fetchMostAnticipatedGames()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <section className="relative w-full min-w-0 max-w-[1920px] mt-[3%]">
      <h1 className="fluid-max-48 text-text-primary font-semibold pl-[2%]">
        Most Anticipated
      </h1>
      <CardCarousel
        games={mostAnticipatedGames}
        options={{
          align: 'center',
          slidesToScroll: 5,
        }}
      />
    </section>
  )
}