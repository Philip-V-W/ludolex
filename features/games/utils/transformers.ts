import type { IGDBGame, RAWGGame } from '../types'
import {
  CompanyData,
  ExtendedGameData,
} from '@/features/games/types/api/games'
import { GameWithIncludes } from '@/lib/api/services/cache'

export function transformIGDBGame(game: IGDBGame): ExtendedGameData {
  const imageUrl = game.cover?.url
    ? game.cover.url.startsWith('//')
      ? `https:${game.cover.url}`
      : game.cover.url
    : '/placeholder.png'

  const companies = game.involved_companies?.reduce<CompanyData[]>((acc, ic) => {
    if (ic.developer) acc.push({ name: ic.company.name, slug: ic.company.slug, role: 'DEVELOPER' })
    if (ic.publisher) acc.push({ name: ic.company.name, slug: ic.company.slug, role: 'PUBLISHER' })
    if (ic.porting) acc.push({ name: ic.company.name, slug: ic.company.slug, role: 'PORT_DEVELOPER' })
    return acc
  }, []) || []

  return {
    id: game.id.toString(),
    rawgId: null,
    igdbId: game.id,
    title: game.name,
    slug: game.slug,
    description: game.summary || '',
    mainImage: imageUrl,
    thumbnails: [],
    platforms: game.platforms?.map(p => ({
      name: p.name,
      slug: p.abbreviation || p.name.toLowerCase(),
    })) || [],
    genres: game.genres?.map(g => g.name) || [],
    score: game.rating ? Math.round(game.rating) : 0,
    rating: game.rating || null,
    releaseDate: game.first_release_date
      ? new Date(game.first_release_date * 1000).toISOString()
      : null,
    ageRating: null,
    supportedLanguages: game.language_supports?.map(ls => ls.language.name) || [],
    systemRequirements: null,
    stores: [],
    companies,
    fullVideoUrl: null,
    previewVideoUrl: null,
    videoPreview: null,
  }
}

export function transformRAWGGame(game: RAWGGame): ExtendedGameData {
  // Transform the system requirements
  const systemRequirements = game.platforms?.reduce((reqs, platform) => {
    if (platform.requirements) {
      reqs[platform.platform.slug] = platform.requirements
    }
    return reqs
  }, {} as Record<string, { minimum?: string; recommended?: string }>) || null

  // Transform the stores data
  const stores = game.stores?.map(store => ({
    url: store.url || '',
    store: {
      id: store.store.id,
      name: store.store.name,
      slug: store.store.slug,
    },
  })) || []

  // Transform platforms with requirements
  const platforms = game.platforms?.map(p => ({
    name: p.platform.name,
    slug: p.platform.slug,
    requirements: p.requirements || undefined,
  })) || []

  const genres = game.genres?.map(g => ({
    name: g.name,
    slug: g.slug,
  })) || []

  const mainImage = game.background_image || '/placeholder.png'
  const uniqueScreenshots = game.short_screenshots?.reduce<string[]>((acc, screenshot) => {
    const imageUrl = screenshot.image
    if (imageUrl && !acc.includes(imageUrl) && imageUrl !== mainImage) {
      acc.push(imageUrl)
    }
    return acc
  }, [mainImage]) || [mainImage]

  // Convert rating to a 0-100 scale if metacritic is not available
  const normalizedRating = game.rating ? Math.round(game.rating * 20) : 0 // RAWG ratings are 0-5, multiply by 20 to get 0-100

  return {
    id: game.id.toString(),
    rawgId: game.id,
    igdbId: null,
    title: game.name,
    slug: game.slug,
    description: game.description || '',
    mainImage,
    thumbnails: uniqueScreenshots,
    platforms,
    genres: genres.map(g => g.name),
    score: game.metacritic || normalizedRating || 0,
    rating: game.rating,
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

// Helper function to check if cached game is fully populated
export function isFullyPopulated(game: GameWithIncludes): boolean {
  return Boolean(
    game.description &&
    game.mainImage &&
    game.screenshots?.length > 0 &&
    game.platforms?.length > 0 &&
    game.genres?.length > 0 &&
    game.companies?.length > 0 &&
    game.gameStore?.length > 0 &&
    game.supportedLanguages?.length > 0,
  )
}

// Helper function to transform cached game to response format
export function transformCachedGame(game: GameWithIncludes) {
  return {
    id: String(game.id),
    title: game.title,
    description: game.description || '',
    mainImage: game.mainImage || '/placeholder.png',
    screenshots: game.screenshots || [],
    previewVideoUrl: game.previewVideoUrl,
    fullVideoUrl: game.fullVideoUrl,
    videoPreview: game.videoPreview,
    releaseDate: game.releaseDate,
    metacritic: game.metacritic || 0,
    rating: game.rating,
    ageRating: game.ageRating,
    supportedLanguages: game.supportedLanguages,
    systemRequirements: game.systemRequirements,
    platforms: game.platforms.map(p => ({
      name: p.platform.name,
      slug: p.platform.slug,
    })),
    genres: game.genres.map(g => g.genre.name),
    stores: game.gameStore.map(s => ({
      name: s.store.name,
      slug: s.store.slug,
      icon: s.store.icon,
      url: s.url,
    })),
    companies: game.companies.map(c => ({
      name: c.company.name,
      slug: c.company.slug,
      role: c.role,
    })),
  }
}