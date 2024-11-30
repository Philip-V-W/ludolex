import type { IGDBGame, RAWGGame } from '../types'
import {
  ExtendedGameData,
  TransformedGame,
} from '@/features/games/types/api/games'

export function transformIGDBGame(game: IGDBGame): TransformedGame {
  return {
    id: game.id.toString(),
    title: game.name,
    slug: game.slug,
    description: game.summary || '',
    mainImage: game.cover?.url || '/placeholder.png',
    thumbnails: [],
    platforms: game.platforms?.map(p => ({
      name: p.name,
      slug: p.abbreviation || p.name.toLowerCase(),
    })) || [],
    genres: game.genres?.map(g => g.name) || [],
    score: game.rating || 0,
  }
}

export function transformRAWGGame(game: RAWGGame): ExtendedGameData {
  const systemRequirements = game.platforms?.reduce((reqs, platform) => {
    if (platform.requirements) {
      reqs[platform.platform.slug] = platform.requirements
    }
    return reqs
  }, {} as Record<string, { minimum?: string; recommended?: string }>) || null

  const stores = game.stores?.map(store => ({
    url: store.url,
    store: {
      id: store.store.id,
      name: store.store.name,
      slug: store.store.slug,
    },
  })) || []

  return {
    id: game.id.toString(),
    rawgId: game.id,
    title: game.name,
    slug: game.slug,
    description: game.description || '',
    mainImage: game.background_image || '/placeholder.png',
    thumbnails: [
      game.background_image,
      ...(game.short_screenshots?.map(s => s.image) || []),
    ].filter(Boolean) as string[],
    platforms: game.platforms?.map(p => ({
      name: p.platform.name,
      slug: p.platform.slug,
      requirements: p.requirements || undefined,
    })) || [],
    genres: game.genres?.map(g => g.name) || [],
    score: game.metacritic || 0,
    releaseDate: game.released || null,
    ageRating: game.esrb_rating?.id || null,
    supportedLanguages: game.languages || [],
    systemRequirements,
    stores,
    companies: [],
    fullVideoUrl: null,
    previewVideoUrl: null,
    videoPreview: null,
  }
}
