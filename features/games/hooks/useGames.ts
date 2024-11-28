'use client'
import { useQuery } from '@tanstack/react-query'
import type { CarouselGame } from '@/components/shared/hero-carousel'

async function fetchTrendingGames(): Promise<CarouselGame[]> {
  const response = await fetch('/api/games/trending')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export function useTrendingGames() {
  return useQuery({
    queryKey: ['trending-games'],
    queryFn: fetchTrendingGames,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  })
}