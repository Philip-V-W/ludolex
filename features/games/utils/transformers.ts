import type { IGDBGame, RAWGGame, TransformedGame } from '../types'
import { TopRated } from '@/components/shared/card-carousel'

export function transformIGDBGame(game: IGDBGame): TransformedGame {
  return {
    id: game.id.toString(),
    title: game.name,
    description: game.summary || '',
    mainImage: game.cover?.url || '/placeholder.png',
    thumbnails: [],
    platforms: game.platforms?.map(p => ({ name: p.name, slug: p.abbreviation || p.name })) || [],
    genres: game.genres?.map(g => g.name) || [],
    score: game.rating || 0,
  }
}

export function transformRAWGGame(game: RAWGGame): TransformedGame {
  return {
    id: game.id.toString(),
    title: game.name,
    description: game.description || '',
    mainImage: game.background_image || '/placeholder.png',
    thumbnails: game.short_screenshots?.map(s => s.image) || [],
    platforms: game.platforms?.map(p => ({
      name: p.platform.name,
      slug: p.platform.slug,
    })) || [],
    genres: game.genres?.map(g => g.name) || [],
    score: game.metacritic || 0,
  }
}

export function transformRAWGTopRated(game: RAWGGame): TopRated {
  return {
    id: game.id.toString(),
    title: game.name,
    mainImage: game.background_image || '/placeholder.png',
    platforms: game.platforms?.map(p => ({
      name: p.platform.name,
      slug: p.platform.slug,
    })) || [],
    score: game.metacritic || 0,
  }
}