import type { IGDBGame, RAWGGame } from '../types'
import { TopRated } from '@/components/shared/card-carousel'
import { ExtendedGameData, TransformedGame } from '@/features/games/types/api/games'

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

export function transformRAWGGame(game: RAWGGame): ExtendedGameData {
  const pcPlatform = game.platforms?.find(p => p.platform.slug === 'pc')

  return {
    id: game.id.toString(),
    rawgId: game.id,
    title: game.name,
    description: game.description || '',
    mainImage: game.background_image || '/placeholder.png',
    thumbnails: [
      game.background_image,
      ...(game.short_screenshots?.map(s => s.image) || [])
    ].filter(Boolean) as string[],
    platforms: game.platforms?.map(p => ({
      name: p.platform.name,
      slug: p.platform.slug,
    })) || [],
    genres: game.genres?.map(g => g.name) || [],
    score: game.metacritic || 0,
    releaseDate: game.released || null,
    ageRating: game.esrb_rating?.id || null,
    supportedLanguages: game.languages || [],
    systemRequirements: pcPlatform?.requirements || null,
    fullVideoUrl: null,
    previewVideoUrl: null,
    videoPreview: null,
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